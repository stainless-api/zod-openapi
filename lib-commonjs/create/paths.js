"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaths = exports.createRequestBody = void 0;
const components_1 = require("./components");
const content_1 = require("./content");
const parameters_1 = require("./parameters");
const responses_1 = require("./responses");
const specificationExtension_1 = require("./specificationExtension");
const createRequestBody = (requestBodyObject, components, subpath) => {
    if (!requestBodyObject) {
        return undefined;
    }
    const component = components.requestBodies.get(requestBodyObject);
    if (component && component.type === 'complete') {
        return {
            $ref: (0, components_1.createComponentRequestBodyRef)(component.ref),
        };
    }
    const ref = requestBodyObject.ref ?? component?.ref;
    const requestBody = {
        ...requestBodyObject,
        content: (0, content_1.createContent)(requestBodyObject.content, components, 'input', [
            ...subpath,
            'content',
        ]),
    };
    if (ref) {
        components.requestBodies.set(requestBodyObject, {
            type: 'complete',
            ref,
            requestBodyObject: requestBody,
        });
        return {
            $ref: (0, components_1.createComponentRequestBodyRef)(ref),
        };
    }
    return requestBody;
};
exports.createRequestBody = createRequestBody;
const createOperation = (operationObject, components, subpath) => {
    const { parameters, requestParams, requestBody, responses, ...rest } = operationObject;
    const maybeParameters = (0, parameters_1.createParametersObject)(parameters, requestParams, components, [...subpath, 'parameters']);
    const maybeRequestBody = (0, exports.createRequestBody)(operationObject.requestBody, components, [...subpath, 'request body']);
    const maybeResponses = (0, responses_1.createResponses)(operationObject.responses, components, [...subpath, 'responses']);
    return {
        ...rest,
        ...(maybeParameters && { parameters: maybeParameters }),
        ...(maybeRequestBody && { requestBody: maybeRequestBody }),
        ...(maybeResponses && { responses: maybeResponses }),
    };
};
const createPathItem = (pathObject, components, path) => Object.entries(pathObject).reduce((acc, [key, value]) => {
    if (!value) {
        return acc;
    }
    if (key === 'get' ||
        key === 'put' ||
        key === 'post' ||
        key === 'delete' ||
        key === 'options' ||
        key === 'head' ||
        key === 'patch' ||
        key === 'trace') {
        acc[key] = createOperation(value, components, [path, key]);
        return acc;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    acc[key] = value;
    return acc;
}, {});
const createPaths = (pathsObject, components) => {
    if (!pathsObject) {
        return undefined;
    }
    return Object.entries(pathsObject).reduce((acc, [path, pathItemObject]) => {
        if ((0, specificationExtension_1.isISpecificationExtension)(path)) {
            acc[path] = pathItemObject;
            return acc;
        }
        acc[path] = createPathItem(pathItemObject, components, path);
        return acc;
    }, {});
};
exports.createPaths = createPaths;
//# sourceMappingURL=paths.js.map
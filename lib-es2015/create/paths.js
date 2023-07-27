import { createComponentRequestBodyRef, } from './components';
import { createContent } from './content';
import { createParametersObject } from './parameters';
import { createResponses } from './responses';
import { isISpecificationExtension } from './specificationExtension';
export const createRequestBody = (requestBodyObject, components, subpath) => {
    if (!requestBodyObject) {
        return undefined;
    }
    const component = components.requestBodies.get(requestBodyObject);
    if (component && component.type === 'complete') {
        return {
            $ref: createComponentRequestBodyRef(component.ref),
        };
    }
    const ref = requestBodyObject.ref ?? component?.ref;
    const requestBody = {
        ...requestBodyObject,
        content: createContent(requestBodyObject.content, components, 'input', [
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
            $ref: createComponentRequestBodyRef(ref),
        };
    }
    return requestBody;
};
const createOperation = (operationObject, components, subpath) => {
    const { parameters, requestParams, requestBody, responses, ...rest } = operationObject;
    const maybeParameters = createParametersObject(parameters, requestParams, components, [...subpath, 'parameters']);
    const maybeRequestBody = createRequestBody(operationObject.requestBody, components, [...subpath, 'request body']);
    const maybeResponses = createResponses(operationObject.responses, components, [...subpath, 'responses']);
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
export const createPaths = (pathsObject, components) => {
    if (!pathsObject) {
        return undefined;
    }
    return Object.entries(pathsObject).reduce((acc, [path, pathItemObject]) => {
        if (isISpecificationExtension(path)) {
            acc[path] = pathItemObject;
            return acc;
        }
        acc[path] = createPathItem(pathItemObject, components, path);
        return acc;
    }, {});
};
//# sourceMappingURL=paths.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponses = exports.createResponse = exports.createComponentHeaderRef = exports.createBaseHeader = exports.createHeaderOrRef = exports.createResponseHeaders = void 0;
const zodType_1 = require("../zodType");
const components_1 = require("./components");
const content_1 = require("./content");
const schema_1 = require("./schema");
const optional_1 = require("./schema/parsers/optional");
const specificationExtension_1 = require("./specificationExtension");
const createResponseHeaders = (responseHeaders, components) => {
    if (!responseHeaders) {
        return undefined;
    }
    if ((0, zodType_1.isAnyZodType)(responseHeaders)) {
        return Object.entries(responseHeaders.shape).reduce((acc, [key, zodSchema]) => {
            acc[key] = (0, exports.createHeaderOrRef)(zodSchema, components);
            return acc;
        }, {});
    }
    return responseHeaders;
};
exports.createResponseHeaders = createResponseHeaders;
const createHeaderOrRef = (schema, components) => {
    const component = components.headers.get(schema);
    if (component && component.type === 'complete') {
        return {
            $ref: (0, exports.createComponentHeaderRef)(component.ref),
        };
    }
    // Optional Objects can return a reference object
    const baseHeader = (0, exports.createBaseHeader)(schema, components);
    if ('$ref' in baseHeader) {
        throw new Error('Unexpected Error: received a reference object');
    }
    const ref = schema._def?.openapi?.header?.ref ?? component?.ref;
    if (ref) {
        components.headers.set(schema, {
            type: 'complete',
            headerObject: baseHeader,
            ref,
        });
        return {
            $ref: (0, exports.createComponentHeaderRef)(ref),
        };
    }
    return baseHeader;
};
exports.createHeaderOrRef = createHeaderOrRef;
const createBaseHeader = (schema, components) => {
    const { ref, ...rest } = schema._def.openapi?.header ?? {};
    const state = (0, schema_1.newSchemaState)({
        components,
        type: 'output',
        path: [],
        visited: new Set(),
    });
    const schemaObject = (0, schema_1.createSchemaObject)(schema, state, ['header']);
    const required = !(0, optional_1.isOptionalSchema)(schema, state);
    return {
        ...rest,
        ...(schema && { schema: schemaObject }),
        ...(required && { required }),
    };
};
exports.createBaseHeader = createBaseHeader;
const createComponentHeaderRef = (ref) => `#/components/headers/${ref}`;
exports.createComponentHeaderRef = createComponentHeaderRef;
const createResponse = (responseObject, components, subpath) => {
    if ('$ref' in responseObject) {
        return responseObject;
    }
    const component = components.responses.get(responseObject);
    if (component && component.type === 'complete') {
        return { $ref: (0, components_1.createComponentResponseRef)(component.ref) };
    }
    const { content, headers, ref, ...rest } = responseObject;
    const maybeHeaders = (0, exports.createResponseHeaders)(headers, components);
    const response = {
        ...rest,
        ...(maybeHeaders && { headers: maybeHeaders }),
        ...(content && {
            content: (0, content_1.createContent)(content, components, 'output', [
                ...subpath,
                'content',
            ]),
        }),
    };
    const responseRef = ref ?? component?.ref;
    if (responseRef) {
        components.responses.set(responseObject, {
            responseObject: response,
            ref: responseRef,
            type: 'complete',
        });
        return {
            $ref: (0, components_1.createComponentResponseRef)(responseRef),
        };
    }
    return response;
};
exports.createResponse = createResponse;
const createResponses = (responsesObject, components, subpath) => Object.entries(responsesObject).reduce((acc, [statusCode, responseObject]) => {
    if ((0, specificationExtension_1.isISpecificationExtension)(statusCode)) {
        acc[statusCode] = responseObject;
        return acc;
    }
    acc[statusCode] = (0, exports.createResponse)(responseObject, components, [
        ...subpath,
        statusCode,
    ]);
    return acc;
}, {});
exports.createResponses = createResponses;
//# sourceMappingURL=responses.js.map
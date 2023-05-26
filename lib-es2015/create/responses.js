import { ZodType } from 'zod';
import { createComponentResponseRef, } from './components';
import { createContent } from './content';
import { createSchemaOrRef, newSchemaState } from './schema';
import { isOptionalSchema } from './schema/optional';
import { isISpecificationExtension } from './specificationExtension';
export const createResponseHeaders = (responseHeaders, components) => {
    if (!responseHeaders) {
        return undefined;
    }
    if (responseHeaders instanceof ZodType) {
        return Object.entries(responseHeaders.shape).reduce((acc, [key, zodSchema]) => {
            acc[key] = createHeaderOrRef(zodSchema, components);
            return acc;
        }, {});
    }
    return responseHeaders;
};
export const createHeaderOrRef = (schema, components) => {
    const component = components.headers.get(schema);
    if (component && component.type === 'complete') {
        return {
            $ref: createComponentHeaderRef(component.ref),
        };
    }
    // Optional Objects can return a reference object
    const baseHeader = createBaseHeader(schema, components);
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
            $ref: createComponentHeaderRef(ref),
        };
    }
    return baseHeader;
};
export const createBaseHeader = (schema, components) => {
    const { ref, ...rest } = schema._def.openapi?.header ?? {};
    const state = newSchemaState({
        components,
        type: 'output',
        path: [],
        visited: new Set(),
    });
    const schemaOrRef = createSchemaOrRef(schema, state, ['header']);
    const required = !isOptionalSchema(schema, state);
    return {
        ...rest,
        ...(schema && { schema: schemaOrRef }),
        ...(required && { required }),
    };
};
export const createComponentHeaderRef = (ref) => `#/components/headers/${ref}`;
export const createResponse = (responseObject, components, subpath) => {
    if ('$ref' in responseObject) {
        return responseObject;
    }
    const component = components.responses.get(responseObject);
    if (component && component.type === 'complete') {
        return { $ref: createComponentResponseRef(component.ref) };
    }
    const { content, headers, ref, ...rest } = responseObject;
    const maybeHeaders = createResponseHeaders(headers, components);
    const response = {
        ...rest,
        ...(maybeHeaders && { headers: maybeHeaders }),
        ...(content && {
            content: createContent(content, components, 'output', [
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
            $ref: createComponentResponseRef(responseRef),
        };
    }
    return response;
};
export const createResponses = (responsesObject, components, subpath) => Object.entries(responsesObject).reduce((acc, [statusCode, responseObject]) => {
    if (isISpecificationExtension(statusCode)) {
        acc[statusCode] = responseObject;
        return acc;
    }
    acc[statusCode] = createResponse(responseObject, components, [
        ...subpath,
        statusCode,
    ]);
    return acc;
}, {});
//# sourceMappingURL=responses.js.map
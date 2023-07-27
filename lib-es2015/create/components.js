import { isAnyZodType } from '../zodType';
import { createParamOrRef } from './parameters';
import { createRequestBody } from './paths';
import { createHeaderOrRef, createResponse } from './responses';
import { createSchemaObject, newSchemaState } from './schema';
export const getDefaultComponents = (componentsObject, openapi = '3.1.0') => {
    const defaultComponents = {
        schemas: new Map(),
        parameters: new Map(),
        headers: new Map(),
        requestBodies: new Map(),
        responses: new Map(),
        openapi,
    };
    if (!componentsObject) {
        return defaultComponents;
    }
    getSchemas(componentsObject.schemas, defaultComponents);
    getParameters(componentsObject.parameters, defaultComponents);
    getRequestBodies(componentsObject.requestBodies, defaultComponents);
    getHeaders(componentsObject.headers, defaultComponents);
    getResponses(componentsObject.responses, defaultComponents);
    return defaultComponents;
};
const getSchemas = (schemas, components) => {
    if (!schemas) {
        return;
    }
    Object.entries(schemas).forEach(([key, schema]) => {
        if (isAnyZodType(schema)) {
            if (components.schemas.has(schema)) {
                throw new Error(`Schema ${JSON.stringify(schema._def)} is already registered`);
            }
            const ref = schema._def.openapi?.ref ?? key;
            components.schemas.set(schema, {
                type: 'manual',
                ref,
            });
        }
    });
};
const getParameters = (parameters, components) => {
    if (!parameters) {
        return;
    }
    Object.entries(parameters).forEach(([key, schema]) => {
        if (isAnyZodType(schema)) {
            if (components.parameters.has(schema)) {
                throw new Error(`Parameter ${JSON.stringify(schema._def)} is already registered`);
            }
            const ref = schema._def.openapi?.param?.ref ?? key;
            const name = schema._def.openapi?.param?.name;
            const location = schema._def.openapi?.param?.in;
            if (!name || !location) {
                throw new Error('`name` or `in` missing in .openapi()');
            }
            components.parameters.set(schema, {
                type: 'manual',
                ref,
                in: location,
                name,
            });
        }
    });
};
const getHeaders = (responseHeaders, components) => {
    if (!responseHeaders) {
        return;
    }
    Object.entries(responseHeaders).forEach(([key, schema]) => {
        if (isAnyZodType(schema)) {
            if (components.parameters.has(schema)) {
                throw new Error(`Header ${JSON.stringify(schema._def)} is already registered`);
            }
            const ref = schema._def.openapi?.param?.ref ?? key;
            components.headers.set(schema, {
                type: 'manual',
                ref,
            });
        }
    });
};
const getResponses = (responses, components) => {
    if (!responses) {
        return;
    }
    Object.entries(responses).forEach(([key, responseObject]) => {
        if (components.responses.has(responseObject)) {
            throw new Error(`Header ${JSON.stringify(responseObject)} is already registered`);
        }
        const ref = responseObject?.ref ?? key;
        components.responses.set(responseObject, {
            type: 'manual',
            ref,
        });
    });
};
const getRequestBodies = (requestBodies, components) => {
    if (!requestBodies) {
        return;
    }
    Object.entries(requestBodies).forEach(([key, requestBody]) => {
        if (components.requestBodies.has(requestBody)) {
            throw new Error(`Header ${JSON.stringify(requestBody)} is already registered`);
        }
        const ref = requestBody?.ref ?? key;
        components.requestBodies.set(requestBody, {
            type: 'manual',
            ref,
        });
    });
};
export const createComponentSchemaRef = (schemaRef) => `#/components/schemas/${schemaRef}`;
export const createComponentResponseRef = (responseRef) => `#/components/responses/${responseRef}`;
export const createComponentRequestBodyRef = (requestBodyRef) => `#/components/requestBodies/${requestBodyRef}`;
export const createComponents = (componentsObject, components) => {
    const combinedSchemas = createSchemaComponents(componentsObject, components);
    const combinedParameters = createParamComponents(componentsObject, components);
    const combinedHeaders = createHeaderComponents(componentsObject, components);
    const combinedResponses = createResponseComponents(components);
    const combinedRequestBodies = createRequestBodiesComponents(components);
    const { schemas, parameters, headers, responses, requestBodies, ...rest } = componentsObject;
    const finalComponents = {
        ...rest,
        ...(combinedSchemas && { schemas: combinedSchemas }),
        ...(combinedParameters && { parameters: combinedParameters }),
        ...(combinedRequestBodies && { requestBodies: combinedRequestBodies }),
        ...(combinedHeaders && { headers: combinedHeaders }),
        ...(combinedResponses && { responses: combinedResponses }),
    };
    return Object.keys(finalComponents).length ? finalComponents : undefined;
};
const createSchemaComponents = (componentsObject, components) => {
    Array.from(components.schemas).forEach(([schema, { type }], index) => {
        if (type === 'manual') {
            const state = newSchemaState({
                components,
                type: schema._def.openapi?.refType ?? 'output',
                path: [],
                visited: new Set(),
            });
            createSchemaObject(schema, state, [`component schema index ${index}`]);
        }
    });
    const customComponents = Object.entries(componentsObject.schemas ?? {}).reduce((acc, [key, value]) => {
        if (isAnyZodType(value)) {
            return acc;
        }
        if (acc[key]) {
            throw new Error(`Schema "${key}" is already registered`);
        }
        acc[key] = value;
        return acc;
    }, {});
    const finalComponents = Array.from(components.schemas).reduce((acc, [_zodType, component]) => {
        if (component.type === 'complete') {
            if (acc[component.ref]) {
                throw new Error(`Schema "${component.ref}" is already registered`);
            }
            acc[component.ref] = component.schemaObject;
        }
        return acc;
    }, customComponents);
    return Object.keys(finalComponents).length ? finalComponents : undefined;
};
const createParamComponents = (componentsObject, components) => {
    Array.from(components.parameters).forEach(([schema, component], index) => {
        if (component.type === 'manual') {
            createParamOrRef(schema, components, [`component parameter index ${index}`], component.in, component.ref);
        }
    });
    const customComponents = Object.entries(componentsObject.parameters ?? {}).reduce((acc, [key, value]) => {
        if (!isAnyZodType(value)) {
            if (acc[key]) {
                throw new Error(`Parameter "${key}" is already registered`);
            }
            acc[key] = value;
        }
        return acc;
    }, {});
    const finalComponents = Array.from(components.parameters).reduce((acc, [_zodType, component]) => {
        if (component.type === 'complete') {
            if (acc[component.ref]) {
                throw new Error(`Parameter "${component.ref}" is already registered`);
            }
            acc[component.ref] = component.paramObject;
        }
        return acc;
    }, customComponents);
    return Object.keys(finalComponents).length ? finalComponents : undefined;
};
const createHeaderComponents = (componentsObject, components) => {
    Array.from(components.headers).forEach(([schema, component]) => {
        if (component.type === 'manual') {
            createHeaderOrRef(schema, components);
        }
    });
    const headers = componentsObject.headers ?? {};
    const customComponents = Object.entries(headers).reduce((acc, [key, value]) => {
        if (!isAnyZodType(value)) {
            if (acc[key]) {
                throw new Error(`Header Ref "${key}" is already registered`);
            }
            acc[key] = value;
        }
        return acc;
    }, {});
    const finalComponents = Array.from(components.headers).reduce((acc, [_zodType, component]) => {
        if (component.type === 'complete') {
            if (acc[component.ref]) {
                throw new Error(`Header "${component.ref}" is already registered`);
            }
            acc[component.ref] = component.headerObject;
        }
        return acc;
    }, customComponents);
    return Object.keys(finalComponents).length ? finalComponents : undefined;
};
const createResponseComponents = (components) => {
    Array.from(components.responses).forEach(([schema, component], index) => {
        if (component.type === 'manual') {
            createResponse(schema, components, [`component response index ${index}`]);
        }
    });
    const finalComponents = Array.from(components.responses).reduce((acc, [_zodType, component]) => {
        if (component.type === 'complete') {
            if (acc[component.ref]) {
                throw new Error(`Response "${component.ref}" is already registered`);
            }
            acc[component.ref] = component.responseObject;
        }
        return acc;
    }, {});
    return Object.keys(finalComponents).length ? finalComponents : undefined;
};
const createRequestBodiesComponents = (components) => {
    Array.from(components.requestBodies).forEach(([schema, component], index) => {
        if (component.type === 'manual') {
            createRequestBody(schema, components, [
                `component request body ${index}`,
            ]);
        }
    });
    const finalComponents = Array.from(components.requestBodies).reduce((acc, [_zodType, component]) => {
        if (component.type === 'complete') {
            if (acc[component.ref]) {
                throw new Error(`RequestBody "${component.ref}" is already registered`);
            }
            acc[component.ref] =
                component.requestBodyObject;
        }
        return acc;
    }, {});
    return Object.keys(finalComponents).length ? finalComponents : undefined;
};
//# sourceMappingURL=components.js.map
import { ZodType } from 'zod';
import { createSchemaOrRef, newSchemaState } from './schema';
import { isOptionalSchema } from './schema/optional';
export const createComponentParamRef = (ref) => `#/components/parameters/${ref}`;
export const createBaseParameter = (schema, components, subpath) => {
    const { ref, ...rest } = schema._def.openapi?.param ?? {};
    const state = newSchemaState({
        components,
        type: 'input',
        path: [],
        visited: new Set(),
    });
    const schemaOrRef = createSchemaOrRef(schema, state, [...subpath, 'schema']);
    const required = !isOptionalSchema(schema, state);
    return {
        ...rest,
        ...(schema && { schema: schemaOrRef }),
        ...(required && { required }),
    };
};
export const createParamOrRef = (zodSchema, components, subpath, type, name) => {
    const component = components.parameters.get(zodSchema);
    const paramType = zodSchema._def?.openapi?.param?.in ?? component?.in ?? type;
    const paramName = zodSchema._def?.openapi?.param?.name ?? component?.name ?? name;
    if (!paramType) {
        throw new Error('Parameter type missing');
    }
    if (!paramName) {
        throw new Error('Parameter name missing');
    }
    if (component && component.type === 'complete') {
        if (!('$ref' in component.paramObject) &&
            (component.in !== type || component.name !== name)) {
            throw new Error(`parameterRef "${component.ref}" is already registered`);
        }
        return {
            $ref: createComponentParamRef(component.ref),
        };
    }
    // Optional Objects can return a reference object
    const baseParamOrRef = createBaseParameter(zodSchema, components, subpath);
    if ('$ref' in baseParamOrRef) {
        throw new Error('Unexpected Error: received a reference object');
    }
    const ref = zodSchema?._def?.openapi?.param?.ref ?? component?.ref;
    const paramObject = {
        in: paramType,
        name: paramName,
        ...baseParamOrRef,
    };
    if (ref) {
        components.parameters.set(zodSchema, {
            type: 'complete',
            paramObject,
            ref,
            in: paramType,
            name: paramName,
        });
        return {
            $ref: createComponentParamRef(ref),
        };
    }
    return paramObject;
};
const createParameters = (type, zodObject, components, subpath) => {
    if (!zodObject) {
        return [];
    }
    return Object.entries(zodObject.shape).map(([key, zodSchema]) => createParamOrRef(zodSchema, components, [...subpath, key], type, key));
};
const createRequestParams = (requestParams, components, subpath) => {
    if (!requestParams) {
        return [];
    }
    const pathParams = createParameters('path', requestParams.path, components, [
        ...subpath,
        'path',
    ]);
    const queryParams = createParameters('query', requestParams.query, components, [...subpath, 'query']);
    const cookieParams = createParameters('cookie', requestParams.cookie, components, [...subpath, 'cookie']);
    const headerParams = createParameters('header', requestParams.header, components, [...subpath, 'header']);
    return [...pathParams, ...queryParams, ...cookieParams, ...headerParams];
};
export const createManualParameters = (parameters, components, subpath) => parameters?.map((param, index) => {
    if (param instanceof ZodType) {
        return createParamOrRef(param, components, [
            ...subpath,
            `param index ${index}`,
        ]);
    }
    return param;
}) ?? [];
export const createParametersObject = (parameters, requestParams, components, subpath) => {
    const manualParameters = createManualParameters(parameters, components, subpath);
    const createdParams = createRequestParams(requestParams, components, subpath);
    const combinedParameters = [
        ...manualParameters,
        ...createdParams,
    ];
    return combinedParameters.length ? combinedParameters : undefined;
};
//# sourceMappingURL=parameters.js.map
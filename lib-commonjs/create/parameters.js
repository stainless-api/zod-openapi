"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParametersObject = exports.createManualParameters = exports.createParamOrRef = exports.createBaseParameter = exports.createComponentParamRef = void 0;
const zodType_1 = require("../zodType");
const document_1 = require("./document");
const schema_1 = require("./schema");
const optional_1 = require("./schema/parsers/optional");
const createComponentParamRef = (ref) => `#/components/parameters/${ref}`;
exports.createComponentParamRef = createComponentParamRef;
const createBaseParameter = (schema, components, subpath) => {
    const { ref, ...rest } = schema._def.openapi?.param ?? {};
    const state = (0, schema_1.newSchemaState)({
        components,
        type: 'input',
        path: [],
        visited: new Set(),
    });
    const schemaObject = (0, schema_1.createSchemaObject)(schema, state, [
        ...subpath,
        'schema',
    ]);
    const required = !(0, optional_1.isOptionalSchema)(schema, state);
    return {
        ...rest,
        ...(schema && { schema: schemaObject }),
        ...(required && { required }),
    };
};
exports.createBaseParameter = createBaseParameter;
const createParamOrRef = (zodSchema, components, subpath, type, name) => {
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
            $ref: (0, exports.createComponentParamRef)(component.ref),
        };
    }
    // Optional Objects can return a reference object
    const baseParamOrRef = (0, exports.createBaseParameter)(zodSchema, components, subpath);
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
            $ref: (0, exports.createComponentParamRef)(ref),
        };
    }
    return paramObject;
};
exports.createParamOrRef = createParamOrRef;
const createParameters = (type, schema, components, subpath) => {
    if (!schema) {
        return [];
    }
    const zodObject = (0, document_1.getZodObject)(schema);
    return Object.entries(zodObject.shape).map(([key, zodSchema]) => (0, exports.createParamOrRef)(zodSchema, components, [...subpath, key], type, key));
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
const createManualParameters = (parameters, components, subpath) => parameters?.map((param, index) => {
    if ((0, zodType_1.isAnyZodType)(param)) {
        return (0, exports.createParamOrRef)(param, components, [
            ...subpath,
            `param index ${index}`,
        ]);
    }
    return param;
}) ?? [];
exports.createManualParameters = createManualParameters;
const createParametersObject = (parameters, requestParams, components, subpath) => {
    const manualParameters = (0, exports.createManualParameters)(parameters, components, subpath);
    const createdParams = createRequestParams(requestParams, components, subpath);
    const combinedParameters = [
        ...manualParameters,
        ...createdParams,
    ];
    return combinedParameters.length ? combinedParameters : undefined;
};
exports.createParametersObject = createParametersObject;
//# sourceMappingURL=parameters.js.map
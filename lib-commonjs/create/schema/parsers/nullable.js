"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNullableSchema = void 0;
const openapi_1 = require("../../../openapi");
const schema_1 = require("../../schema");
const createNullableSchema = (zodNullable, state) => {
    const schemaObject = (0, schema_1.createSchemaObject)(zodNullable.unwrap(), state, ['nullable']);
    if ('$ref' in schemaObject || schemaObject.allOf) {
        return {
            oneOf: mapNullOf([schemaObject], state.components.openapi),
        };
    }
    if (schemaObject.oneOf) {
        const { oneOf, ...schema } = schemaObject;
        return {
            oneOf: mapNullOf(oneOf, state.components.openapi),
            ...schema,
        };
    }
    if (schemaObject.anyOf) {
        const { anyOf, ...schema } = schemaObject;
        return {
            anyOf: mapNullOf(anyOf, state.components.openapi),
            ...schema,
        };
    }
    const { type, ...schema } = schemaObject;
    if ((0, openapi_1.satisfiesVersion)(state.components.openapi, '3.1.0')) {
        return {
            type: mapNullType(type),
            ...schema,
        };
    }
    return {
        type,
        nullable: true,
        ...schema,
        // https://github.com/OAI/OpenAPI-Specification/blob/main/proposals/2019-10-31-Clarify-Nullable.md#if-a-schema-specifies-nullable-true-and-enum-1-2-3-does-that-schema-allow-null-values-see-1900
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ...(schema.enum && { enum: [...schema.enum, null] }),
    };
};
exports.createNullableSchema = createNullableSchema;
const mapNullType = (type) => {
    if (!type) {
        return 'null';
    }
    if (Array.isArray(type)) {
        return [...type, 'null'];
    }
    return [type, 'null'];
};
const mapNullOf = (ofSchema, openapi) => {
    if ((0, openapi_1.satisfiesVersion)(openapi, '3.1.0')) {
        return [...ofSchema, { type: 'null' }];
    }
    return [...ofSchema, { nullable: true }];
};
//# sourceMappingURL=nullable.js.map
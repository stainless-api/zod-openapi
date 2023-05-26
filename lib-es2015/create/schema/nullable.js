import { satisfiesVersion } from '../../openapi';
import { createSchemaOrRef } from '.';
export const createNullableSchema = (zodNullable, state) => {
    const schemaOrReference = createSchemaOrRef(zodNullable.unwrap(), state, ['nullable']);
    if ('$ref' in schemaOrReference || schemaOrReference.allOf) {
        return {
            oneOf: mapNullOf([schemaOrReference], state.components.openapi),
        };
    }
    if (schemaOrReference.oneOf) {
        const { oneOf, ...schema } = schemaOrReference;
        return {
            oneOf: mapNullOf(oneOf, state.components.openapi),
            ...schema,
        };
    }
    if (schemaOrReference.anyOf) {
        const { anyOf, ...schema } = schemaOrReference;
        return {
            anyOf: mapNullOf(anyOf, state.components.openapi),
            ...schema,
        };
    }
    const { type, ...schema } = schemaOrReference;
    if (satisfiesVersion(state.components.openapi, '3.1.0')) {
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
    if (satisfiesVersion(openapi, '3.1.0')) {
        return [...ofSchema, { type: 'null' }];
    }
    return [...ofSchema, { nullable: true }];
};
//# sourceMappingURL=nullable.js.map
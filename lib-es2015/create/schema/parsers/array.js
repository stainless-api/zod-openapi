import { createSchemaObject } from '../../schema';
export const createArraySchema = (zodArray, state) => {
    const zodType = zodArray._def.type;
    const minItems = zodArray._def.exactLength?.value ?? zodArray._def.minLength?.value;
    const maxItems = zodArray._def.exactLength?.value ?? zodArray._def.maxLength?.value;
    return {
        type: 'array',
        items: createSchemaObject(zodType, state, ['array items']),
        ...(minItems !== undefined && { minItems }),
        ...(maxItems !== undefined && { maxItems }),
    };
};
//# sourceMappingURL=array.js.map
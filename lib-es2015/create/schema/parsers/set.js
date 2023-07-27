import { createSchemaObject } from '../../schema';
export const createSetSchema = (zodSet, state) => {
    const schema = zodSet._def.valueType;
    const minItems = zodSet._def.minSize?.value;
    const maxItems = zodSet._def.maxSize?.value;
    return {
        type: 'array',
        items: createSchemaObject(schema, state, ['set items']),
        uniqueItems: true,
        ...(minItems !== undefined && { minItems }),
        ...(maxItems !== undefined && { maxItems }),
    };
};
//# sourceMappingURL=set.js.map
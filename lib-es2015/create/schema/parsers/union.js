import { createSchemaObject } from '../../schema';
export const createUnionSchema = (zodUnion, state) => {
    const options = zodUnion.options;
    const schemas = options.map((option, index) => createSchemaObject(option, state, [`union option ${index}`]));
    return {
        anyOf: schemas,
    };
};
//# sourceMappingURL=union.js.map
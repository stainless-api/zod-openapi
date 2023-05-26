import { createSchemaOrRef } from '.';
export const createUnionSchema = (zodUnion, state) => {
    const options = zodUnion.options;
    const schemas = options.map((option, index) => createSchemaOrRef(option, state, [`union option ${index}`]));
    return {
        anyOf: schemas,
    };
};
//# sourceMappingURL=union.js.map
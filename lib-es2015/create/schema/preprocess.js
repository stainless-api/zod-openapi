import { createSchemaOrRef } from '.';
export const createPreprocessSchema = (zodPreprocess, state) => createSchemaOrRef(zodPreprocess._def.schema, state, [
    'preprocess schema',
]);
//# sourceMappingURL=preprocess.js.map
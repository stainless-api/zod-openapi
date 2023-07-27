import { createSchemaObject } from '../../schema';
export const createPreprocessSchema = (zodPreprocess, state) => createSchemaObject(zodPreprocess._def.schema, state, [
    'preprocess schema',
]);
//# sourceMappingURL=preprocess.js.map
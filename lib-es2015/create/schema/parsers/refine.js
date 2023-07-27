import { createSchemaObject } from '../../schema';
export const createRefineSchema = (zodRefine, state) => createSchemaObject(zodRefine._def.schema, state, [
    'refine schema',
]);
//# sourceMappingURL=refine.js.map
import { createSchemaOrRef } from '.';
export const createRefineSchema = (zodRefine, state) => createSchemaOrRef(zodRefine._def.schema, state, ['refine schema']);
//# sourceMappingURL=refine.js.map
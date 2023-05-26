import { createSchemaOrRef } from '.';
export const createCatchSchema = (zodCatch, state) => createSchemaOrRef(zodCatch._def.innerType, state, ['catch']);
//# sourceMappingURL=catch.js.map
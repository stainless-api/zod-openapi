import { createSchemaObject } from '../../schema';
export const createCatchSchema = (zodCatch, state) => createSchemaObject(zodCatch._def.innerType, state, ['catch']);
//# sourceMappingURL=catch.js.map
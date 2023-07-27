import { createSchemaObject } from '../../schema';
export const createBrandedSchema = (zodBranded, state) => createSchemaObject(zodBranded._def.type, state, ['brand']);
//# sourceMappingURL=brand.js.map
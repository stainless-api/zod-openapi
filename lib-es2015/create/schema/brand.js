import { createSchemaOrRef } from '.';
export const createBrandedSchema = (zodBranded, state) => createSchemaOrRef(zodBranded._def.type, state, ['brand']);
//# sourceMappingURL=brand.js.map
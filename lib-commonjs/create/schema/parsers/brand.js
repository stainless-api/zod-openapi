"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrandedSchema = void 0;
const schema_1 = require("../../schema");
const createBrandedSchema = (zodBranded, state) => (0, schema_1.createSchemaObject)(zodBranded._def.type, state, ['brand']);
exports.createBrandedSchema = createBrandedSchema;
//# sourceMappingURL=brand.js.map
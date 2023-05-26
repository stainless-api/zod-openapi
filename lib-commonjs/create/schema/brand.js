"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrandedSchema = void 0;
const _1 = require(".");
const createBrandedSchema = (zodBranded, state) => (0, _1.createSchemaOrRef)(zodBranded._def.type, state, ['brand']);
exports.createBrandedSchema = createBrandedSchema;
//# sourceMappingURL=brand.js.map
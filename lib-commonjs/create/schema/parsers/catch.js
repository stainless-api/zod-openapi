"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCatchSchema = void 0;
const schema_1 = require("../../schema");
const createCatchSchema = (zodCatch, state) => (0, schema_1.createSchemaObject)(zodCatch._def.innerType, state, ['catch']);
exports.createCatchSchema = createCatchSchema;
//# sourceMappingURL=catch.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefineSchema = void 0;
const schema_1 = require("../../schema");
const createRefineSchema = (zodRefine, state) => (0, schema_1.createSchemaObject)(zodRefine._def.schema, state, [
    'refine schema',
]);
exports.createRefineSchema = createRefineSchema;
//# sourceMappingURL=refine.js.map
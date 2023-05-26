"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefineSchema = void 0;
const _1 = require(".");
const createRefineSchema = (zodRefine, state) => (0, _1.createSchemaOrRef)(zodRefine._def.schema, state, ['refine schema']);
exports.createRefineSchema = createRefineSchema;
//# sourceMappingURL=refine.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCatchSchema = void 0;
const _1 = require(".");
const createCatchSchema = (zodCatch, state) => (0, _1.createSchemaOrRef)(zodCatch._def.innerType, state, ['catch']);
exports.createCatchSchema = createCatchSchema;
//# sourceMappingURL=catch.js.map
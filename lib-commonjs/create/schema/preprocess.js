"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPreprocessSchema = void 0;
const _1 = require(".");
const createPreprocessSchema = (zodPreprocess, state) => (0, _1.createSchemaOrRef)(zodPreprocess._def.schema, state, [
    'preprocess schema',
]);
exports.createPreprocessSchema = createPreprocessSchema;
//# sourceMappingURL=preprocess.js.map
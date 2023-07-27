"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPreprocessSchema = void 0;
const schema_1 = require("../../schema");
const createPreprocessSchema = (zodPreprocess, state) => (0, schema_1.createSchemaObject)(zodPreprocess._def.schema, state, [
    'preprocess schema',
]);
exports.createPreprocessSchema = createPreprocessSchema;
//# sourceMappingURL=preprocess.js.map
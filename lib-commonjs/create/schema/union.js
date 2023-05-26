"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUnionSchema = void 0;
const _1 = require(".");
const createUnionSchema = (zodUnion, state) => {
    const options = zodUnion.options;
    const schemas = options.map((option, index) => (0, _1.createSchemaOrRef)(option, state, [`union option ${index}`]));
    return {
        anyOf: schemas,
    };
};
exports.createUnionSchema = createUnionSchema;
//# sourceMappingURL=union.js.map
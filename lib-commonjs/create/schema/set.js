"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSetSchema = void 0;
const _1 = require(".");
const createSetSchema = (zodSet, state) => {
    const schema = zodSet._def.valueType;
    const minItems = zodSet._def.minSize?.value;
    const maxItems = zodSet._def.maxSize?.value;
    return {
        type: 'array',
        items: (0, _1.createSchemaOrRef)(schema, state, ['set items']),
        uniqueItems: true,
        ...(minItems !== undefined && { minItems }),
        ...(maxItems !== undefined && { maxItems }),
    };
};
exports.createSetSchema = createSetSchema;
//# sourceMappingURL=set.js.map
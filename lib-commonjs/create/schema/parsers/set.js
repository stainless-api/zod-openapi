"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSetSchema = void 0;
const schema_1 = require("../../schema");
const createSetSchema = (zodSet, state) => {
    const schema = zodSet._def.valueType;
    const minItems = zodSet._def.minSize?.value;
    const maxItems = zodSet._def.maxSize?.value;
    return {
        type: 'array',
        items: (0, schema_1.createSchemaObject)(schema, state, ['set items']),
        uniqueItems: true,
        ...(minItems !== undefined && { minItems }),
        ...(maxItems !== undefined && { maxItems }),
    };
};
exports.createSetSchema = createSetSchema;
//# sourceMappingURL=set.js.map
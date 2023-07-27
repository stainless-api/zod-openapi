"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArraySchema = void 0;
const schema_1 = require("../../schema");
const createArraySchema = (zodArray, state) => {
    const zodType = zodArray._def.type;
    const minItems = zodArray._def.exactLength?.value ?? zodArray._def.minLength?.value;
    const maxItems = zodArray._def.exactLength?.value ?? zodArray._def.maxLength?.value;
    return {
        type: 'array',
        items: (0, schema_1.createSchemaObject)(zodType, state, ['array items']),
        ...(minItems !== undefined && { minItems }),
        ...(maxItems !== undefined && { maxItems }),
    };
};
exports.createArraySchema = createArraySchema;
//# sourceMappingURL=array.js.map
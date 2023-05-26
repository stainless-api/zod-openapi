"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArraySchema = void 0;
const _1 = require(".");
const createArraySchema = (zodArray, state) => {
    const zodType = zodArray._def.type;
    const minItems = zodArray._def.exactLength?.value ?? zodArray._def.minLength?.value;
    const maxItems = zodArray._def.exactLength?.value ?? zodArray._def.maxLength?.value;
    return {
        type: 'array',
        items: (0, _1.createSchemaOrRef)(zodType, state, ['array items']),
        ...(minItems !== undefined && { minItems }),
        ...(maxItems !== undefined && { maxItems }),
    };
};
exports.createArraySchema = createArraySchema;
//# sourceMappingURL=array.js.map
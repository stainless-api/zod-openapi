"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwTransformError = exports.createTransformSchema = void 0;
const manual_1 = require("./manual");
const _1 = require(".");
const createTransformSchema = (zodTransform, state) => {
    if (zodTransform._def.openapi?.effectType === 'output') {
        return (0, manual_1.createManualTypeSchema)(zodTransform, state);
    }
    if (zodTransform._def.openapi?.effectType === 'input') {
        return (0, _1.createSchemaOrRef)(zodTransform._def.schema, state, [
            'transform input',
        ]);
    }
    if (state.type === 'output') {
        return (0, manual_1.createManualTypeSchema)(zodTransform, state);
    }
    if (state.effectType === 'output') {
        (0, exports.throwTransformError)(zodTransform, state);
    }
    state.effectType = 'input';
    return (0, _1.createSchemaOrRef)(zodTransform._def.schema, state, [
        'transform input',
    ]);
};
exports.createTransformSchema = createTransformSchema;
const throwTransformError = (zodType, state) => {
    throw new Error(`${JSON.stringify(zodType)} at ${state.path.join(' > ')} contains a transform but is used in both an input and an output. This is likely a mistake. Set an \`effectType\` to resolve`);
};
exports.throwTransformError = throwTransformError;
//# sourceMappingURL=transform.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwTransformError = exports.createTransformSchema = void 0;
const schema_1 = require("../../schema");
const manual_1 = require("./manual");
const createTransformSchema = (zodTransform, state) => {
    if (zodTransform._def.openapi?.effectType === 'output') {
        return (0, manual_1.createManualTypeSchema)(zodTransform, state);
    }
    if (zodTransform._def.openapi?.effectType === 'input') {
        return (0, schema_1.createSchemaObject)(zodTransform._def.schema, state, [
            'transform input',
        ]);
    }
    if (state.type === 'output') {
        return (0, manual_1.createManualTypeSchema)(zodTransform, state);
    }
    state.effectType = 'input';
    return (0, schema_1.createSchemaObject)(zodTransform._def.schema, state, [
        'transform input',
    ]);
};
exports.createTransformSchema = createTransformSchema;
const throwTransformError = (zodType, state) => {
    throw new Error(`${JSON.stringify(zodType)} at ${state.path.join(' > ')} contains a transformation but is used in both an input and an output. This is likely a mistake. Set an \`effectType\`, wrap it in a ZodPipeline or assign it a manual type to resolve`);
};
exports.throwTransformError = throwTransformError;
//# sourceMappingURL=transform.js.map
import { createManualTypeSchema } from './manual';
import { createSchemaOrRef } from '.';
export const createTransformSchema = (zodTransform, state) => {
    if (zodTransform._def.openapi?.effectType === 'output') {
        return createManualTypeSchema(zodTransform, state);
    }
    if (zodTransform._def.openapi?.effectType === 'input') {
        return createSchemaOrRef(zodTransform._def.schema, state, [
            'transform input',
        ]);
    }
    if (state.type === 'output') {
        return createManualTypeSchema(zodTransform, state);
    }
    if (state.effectType === 'output') {
        throwTransformError(zodTransform, state);
    }
    state.effectType = 'input';
    return createSchemaOrRef(zodTransform._def.schema, state, [
        'transform input',
    ]);
};
export const throwTransformError = (zodType, state) => {
    throw new Error(`${JSON.stringify(zodType)} at ${state.path.join(' > ')} contains a transform but is used in both an input and an output. This is likely a mistake. Set an \`effectType\` to resolve`);
};
//# sourceMappingURL=transform.js.map
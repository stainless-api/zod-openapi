import { createSchemaObject } from '../../schema';
import { createManualTypeSchema } from './manual';
export const createTransformSchema = (zodTransform, state) => {
    if (zodTransform._def.openapi?.effectType === 'output') {
        return createManualTypeSchema(zodTransform, state);
    }
    if (zodTransform._def.openapi?.effectType === 'input') {
        return createSchemaObject(zodTransform._def.schema, state, [
            'transform input',
        ]);
    }
    if (state.type === 'output') {
        return createManualTypeSchema(zodTransform, state);
    }
    state.effectType = 'input';
    return createSchemaObject(zodTransform._def.schema, state, [
        'transform input',
    ]);
};
export const throwTransformError = (zodType, state) => {
    throw new Error(`${JSON.stringify(zodType)} at ${state.path.join(' > ')} contains a transformation but is used in both an input and an output. This is likely a mistake. Set an \`effectType\`, wrap it in a ZodPipeline or assign it a manual type to resolve`);
};
//# sourceMappingURL=transform.js.map
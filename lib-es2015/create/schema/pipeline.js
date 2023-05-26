import { throwTransformError } from './transform';
import { createSchemaOrRef } from '.';
export const createPipelineSchema = (zodPipeline, state) => {
    if (zodPipeline._def.openapi?.effectType === 'input') {
        return createSchemaOrRef(zodPipeline._def.in, state, [
            'pipeline input',
        ]);
    }
    if (zodPipeline._def.openapi?.effectType === 'output') {
        return createSchemaOrRef(zodPipeline._def.out, state, [
            'pipeline output',
        ]);
    }
    if (state.type === 'input') {
        if (state.effectType === 'output') {
            throwTransformError(zodPipeline, state);
        }
        state.effectType = 'input';
        return createSchemaOrRef(zodPipeline._def.in, state, [
            'pipeline input',
        ]);
    }
    if (state.effectType === 'input') {
        throwTransformError(zodPipeline, state);
    }
    state.effectType = 'output';
    return createSchemaOrRef(zodPipeline._def.out, state, [
        'pipeline output',
    ]);
};
//# sourceMappingURL=pipeline.js.map
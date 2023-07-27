import { createSchemaObject } from '../../schema';
export const createPipelineSchema = (zodPipeline, state) => {
    if (zodPipeline._def.openapi?.effectType === 'input') {
        return createSchemaObject(zodPipeline._def.in, state, [
            'pipeline input',
        ]);
    }
    if (zodPipeline._def.openapi?.effectType === 'output') {
        return createSchemaObject(zodPipeline._def.out, state, [
            'pipeline output',
        ]);
    }
    if (state.type === 'input') {
        state.effectType = 'input';
        return createSchemaObject(zodPipeline._def.in, state, [
            'pipeline input',
        ]);
    }
    state.effectType = 'output';
    return createSchemaObject(zodPipeline._def.out, state, [
        'pipeline output',
    ]);
};
//# sourceMappingURL=pipeline.js.map
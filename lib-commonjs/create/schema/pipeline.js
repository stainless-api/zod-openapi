"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPipelineSchema = void 0;
const transform_1 = require("./transform");
const _1 = require(".");
const createPipelineSchema = (zodPipeline, state) => {
    if (zodPipeline._def.openapi?.effectType === 'input') {
        return (0, _1.createSchemaOrRef)(zodPipeline._def.in, state, [
            'pipeline input',
        ]);
    }
    if (zodPipeline._def.openapi?.effectType === 'output') {
        return (0, _1.createSchemaOrRef)(zodPipeline._def.out, state, [
            'pipeline output',
        ]);
    }
    if (state.type === 'input') {
        if (state.effectType === 'output') {
            (0, transform_1.throwTransformError)(zodPipeline, state);
        }
        state.effectType = 'input';
        return (0, _1.createSchemaOrRef)(zodPipeline._def.in, state, [
            'pipeline input',
        ]);
    }
    if (state.effectType === 'input') {
        (0, transform_1.throwTransformError)(zodPipeline, state);
    }
    state.effectType = 'output';
    return (0, _1.createSchemaOrRef)(zodPipeline._def.out, state, [
        'pipeline output',
    ]);
};
exports.createPipelineSchema = createPipelineSchema;
//# sourceMappingURL=pipeline.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPipelineSchema = void 0;
const schema_1 = require("../../schema");
const createPipelineSchema = (zodPipeline, state) => {
    if (zodPipeline._def.openapi?.effectType === 'input') {
        return (0, schema_1.createSchemaObject)(zodPipeline._def.in, state, [
            'pipeline input',
        ]);
    }
    if (zodPipeline._def.openapi?.effectType === 'output') {
        return (0, schema_1.createSchemaObject)(zodPipeline._def.out, state, [
            'pipeline output',
        ]);
    }
    if (state.type === 'input') {
        state.effectType = 'input';
        return (0, schema_1.createSchemaObject)(zodPipeline._def.in, state, [
            'pipeline input',
        ]);
    }
    state.effectType = 'output';
    return (0, schema_1.createSchemaObject)(zodPipeline._def.out, state, [
        'pipeline output',
    ]);
};
exports.createPipelineSchema = createPipelineSchema;
//# sourceMappingURL=pipeline.js.map
import { ZodEffects } from 'zod';
export const createManualTypeSchema = (zodSchema, state) => {
    if (!zodSchema._def.openapi?.type) {
        const zodType = zodSchema.constructor.name;
        if (zodSchema instanceof ZodEffects) {
            const schemaName = `${zodType} - ${zodSchema._def.effect.type}`;
            throw new Error(`Unknown schema ${schemaName} at ${state.path.join(' > ')}. Please assign it a manual 'type', wrap it in a ZodPipeline or change the 'effectType'.`);
        }
        throw new Error(`Unknown schema ${zodType}. Please assign it a manual 'type'.`);
    }
    return {
        type: zodSchema._def.openapi.type,
    };
};
//# sourceMappingURL=manual.js.map
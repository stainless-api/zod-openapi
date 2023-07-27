"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createManualTypeSchema = void 0;
const zodType_1 = require("../../../zodType");
const createManualTypeSchema = (zodSchema, state) => {
    if (!zodSchema._def.openapi?.type) {
        const zodType = zodSchema.constructor.name;
        if ((0, zodType_1.isZodType)(zodSchema, 'ZodEffects')) {
            const schemaName = `${zodType} - ${zodSchema._def.effect.type}`;
            throw new Error(`Unknown schema ${schemaName} at ${state.path.join(' > ')}. Please assign it a manual 'type', wrap it in a ZodPipeline or change the 'effectType'.`);
        }
        throw new Error(`Unknown schema ${zodType}. Please assign it a manual 'type'.`);
    }
    return {
        type: zodSchema._def.openapi.type,
    };
};
exports.createManualTypeSchema = createManualTypeSchema;
//# sourceMappingURL=manual.js.map
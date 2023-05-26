"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOptionalSchema = exports.createOptionalSchema = void 0;
const zod_1 = require("zod");
const _1 = require(".");
const createOptionalSchema = (zodOptional, state) => // Optional doesn't change OpenAPI schema
 (0, _1.createSchemaOrRef)(zodOptional.unwrap(), state, ['optional']);
exports.createOptionalSchema = createOptionalSchema;
const isOptionalSchema = (zodSchema, state) => {
    if (zodSchema instanceof zod_1.ZodOptional || zodSchema instanceof zod_1.ZodDefault) {
        return true;
    }
    if (zodSchema instanceof zod_1.ZodNullable || zodSchema instanceof zod_1.ZodCatch) {
        return (0, exports.isOptionalSchema)(zodSchema._def.innerType, state);
    }
    if (zodSchema instanceof zod_1.ZodEffects) {
        return (0, exports.isOptionalSchema)(zodSchema._def.schema, state);
    }
    if (zodSchema instanceof zod_1.ZodUnion ||
        zodSchema instanceof zod_1.ZodDiscriminatedUnion) {
        return zodSchema._def.options.some((schema) => (0, exports.isOptionalSchema)(schema, state));
    }
    if (zodSchema instanceof zod_1.ZodIntersection) {
        return [zodSchema._def.left, zodSchema._def.right].some((schema) => (0, exports.isOptionalSchema)(schema, state));
    }
    if (zodSchema instanceof zod_1.ZodPipeline) {
        if (state.effectType === 'input' ||
            (state.type === 'input' && state.effectType !== 'output')) {
            return (0, exports.isOptionalSchema)(zodSchema._def.in, state);
        }
        if (state.effectType === 'output' ||
            (state.type === 'output' && state.effectType !== 'input')) {
            return (0, exports.isOptionalSchema)(zodSchema._def.out, state);
        }
    }
    if (zodSchema instanceof zod_1.ZodLazy) {
        return (0, exports.isOptionalSchema)(zodSchema._def.getter(), state);
    }
    return zodSchema.isOptional();
};
exports.isOptionalSchema = isOptionalSchema;
//# sourceMappingURL=optional.js.map
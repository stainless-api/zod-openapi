"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOptionalSchema = exports.createOptionalSchema = void 0;
const zodType_1 = require("../../../zodType");
const schema_1 = require("../../schema");
const createOptionalSchema = (zodOptional, state) => // Optional doesn't change OpenAPI schema
 (0, schema_1.createSchemaObject)(zodOptional.unwrap(), state, ['optional']);
exports.createOptionalSchema = createOptionalSchema;
const isOptionalSchema = (zodSchema, state) => {
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodOptional') ||
        (0, zodType_1.isZodType)(zodSchema, 'ZodDefault')) {
        return true;
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodNullable') || (0, zodType_1.isZodType)(zodSchema, 'ZodCatch')) {
        return (0, exports.isOptionalSchema)(zodSchema._def.innerType, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodEffects')) {
        return (0, exports.isOptionalSchema)(zodSchema._def.schema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodUnion') ||
        (0, zodType_1.isZodType)(zodSchema, 'ZodDiscriminatedUnion')) {
        return zodSchema._def.options.some((schema) => (0, exports.isOptionalSchema)(schema, state));
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodIntersection')) {
        return [zodSchema._def.left, zodSchema._def.right].some((schema) => (0, exports.isOptionalSchema)(schema, state));
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodPipeline')) {
        if (state.effectType === 'input' ||
            (state.type === 'input' && state.effectType !== 'output')) {
            return (0, exports.isOptionalSchema)(zodSchema._def.in, state);
        }
        if (state.effectType === 'output' ||
            (state.type === 'output' && state.effectType !== 'input')) {
            return (0, exports.isOptionalSchema)(zodSchema._def.out, state);
        }
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodLazy')) {
        return (0, exports.isOptionalSchema)(zodSchema._def.getter(), state);
    }
    return zodSchema.isOptional();
};
exports.isOptionalSchema = isOptionalSchema;
//# sourceMappingURL=optional.js.map
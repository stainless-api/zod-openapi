import { ZodCatch, ZodDefault, ZodDiscriminatedUnion, ZodEffects, ZodIntersection, ZodLazy, ZodNullable, ZodOptional, ZodPipeline, ZodUnion, } from 'zod';
import { createSchemaOrRef } from '.';
export const createOptionalSchema = (zodOptional, state) => // Optional doesn't change OpenAPI schema
 createSchemaOrRef(zodOptional.unwrap(), state, ['optional']);
export const isOptionalSchema = (zodSchema, state) => {
    if (zodSchema instanceof ZodOptional || zodSchema instanceof ZodDefault) {
        return true;
    }
    if (zodSchema instanceof ZodNullable || zodSchema instanceof ZodCatch) {
        return isOptionalSchema(zodSchema._def.innerType, state);
    }
    if (zodSchema instanceof ZodEffects) {
        return isOptionalSchema(zodSchema._def.schema, state);
    }
    if (zodSchema instanceof ZodUnion ||
        zodSchema instanceof ZodDiscriminatedUnion) {
        return zodSchema._def.options.some((schema) => isOptionalSchema(schema, state));
    }
    if (zodSchema instanceof ZodIntersection) {
        return [zodSchema._def.left, zodSchema._def.right].some((schema) => isOptionalSchema(schema, state));
    }
    if (zodSchema instanceof ZodPipeline) {
        if (state.effectType === 'input' ||
            (state.type === 'input' && state.effectType !== 'output')) {
            return isOptionalSchema(zodSchema._def.in, state);
        }
        if (state.effectType === 'output' ||
            (state.type === 'output' && state.effectType !== 'input')) {
            return isOptionalSchema(zodSchema._def.out, state);
        }
    }
    if (zodSchema instanceof ZodLazy) {
        return isOptionalSchema(zodSchema._def.getter(), state);
    }
    return zodSchema.isOptional();
};
//# sourceMappingURL=optional.js.map
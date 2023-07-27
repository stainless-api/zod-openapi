import { isZodType } from '../../../zodType';
import { createSchemaObject } from '../../schema';
export const createOptionalSchema = (zodOptional, state) => // Optional doesn't change OpenAPI schema
 createSchemaObject(zodOptional.unwrap(), state, ['optional']);
export const isOptionalSchema = (zodSchema, state) => {
    if (isZodType(zodSchema, 'ZodOptional') ||
        isZodType(zodSchema, 'ZodDefault')) {
        return true;
    }
    if (isZodType(zodSchema, 'ZodNullable') || isZodType(zodSchema, 'ZodCatch')) {
        return isOptionalSchema(zodSchema._def.innerType, state);
    }
    if (isZodType(zodSchema, 'ZodEffects')) {
        return isOptionalSchema(zodSchema._def.schema, state);
    }
    if (isZodType(zodSchema, 'ZodUnion') ||
        isZodType(zodSchema, 'ZodDiscriminatedUnion')) {
        return zodSchema._def.options.some((schema) => isOptionalSchema(schema, state));
    }
    if (isZodType(zodSchema, 'ZodIntersection')) {
        return [zodSchema._def.left, zodSchema._def.right].some((schema) => isOptionalSchema(schema, state));
    }
    if (isZodType(zodSchema, 'ZodPipeline')) {
        if (state.effectType === 'input' ||
            (state.type === 'input' && state.effectType !== 'output')) {
            return isOptionalSchema(zodSchema._def.in, state);
        }
        if (state.effectType === 'output' ||
            (state.type === 'output' && state.effectType !== 'input')) {
            return isOptionalSchema(zodSchema._def.out, state);
        }
    }
    if (isZodType(zodSchema, 'ZodLazy')) {
        return isOptionalSchema(zodSchema._def.getter(), state);
    }
    return zodSchema.isOptional();
};
//# sourceMappingURL=optional.js.map
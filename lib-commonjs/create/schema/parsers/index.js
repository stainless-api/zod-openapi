"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchemaSwitch = void 0;
const zodType_1 = require("../../../zodType");
const array_1 = require("./array");
const boolean_1 = require("./boolean");
const brand_1 = require("./brand");
const catch_1 = require("./catch");
const date_1 = require("./date");
const default_1 = require("./default");
const discriminatedUnion_1 = require("./discriminatedUnion");
const enum_1 = require("./enum");
const intersection_1 = require("./intersection");
const lazy_1 = require("./lazy");
const literal_1 = require("./literal");
const manual_1 = require("./manual");
const nativeEnum_1 = require("./nativeEnum");
const null_1 = require("./null");
const nullable_1 = require("./nullable");
const number_1 = require("./number");
const object_1 = require("./object");
const optional_1 = require("./optional");
const pipeline_1 = require("./pipeline");
const preprocess_1 = require("./preprocess");
const record_1 = require("./record");
const refine_1 = require("./refine");
const set_1 = require("./set");
const string_1 = require("./string");
const transform_1 = require("./transform");
const tuple_1 = require("./tuple");
const union_1 = require("./union");
const unknown_1 = require("./unknown");
const createSchemaSwitch = (zodSchema, state) => {
    if (zodSchema._def.openapi?.type) {
        return (0, manual_1.createManualTypeSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodString')) {
        return (0, string_1.createStringSchema)(zodSchema);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodNumber')) {
        return (0, number_1.createNumberSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodBoolean')) {
        return (0, boolean_1.createBooleanSchema)(zodSchema);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodEnum')) {
        return (0, enum_1.createEnumSchema)(zodSchema);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodLiteral')) {
        return (0, literal_1.createLiteralSchema)(zodSchema);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodNativeEnum')) {
        return (0, nativeEnum_1.createNativeEnumSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodArray')) {
        return (0, array_1.createArraySchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodObject')) {
        return (0, object_1.createObjectSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodUnion')) {
        return (0, union_1.createUnionSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodDiscriminatedUnion')) {
        return (0, discriminatedUnion_1.createDiscriminatedUnionSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodNull')) {
        return (0, null_1.createNullSchema)(zodSchema);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodNullable')) {
        return (0, nullable_1.createNullableSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodOptional')) {
        return (0, optional_1.createOptionalSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodDefault')) {
        return (0, default_1.createDefaultSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodRecord')) {
        return (0, record_1.createRecordSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodTuple')) {
        return (0, tuple_1.createTupleSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodDate')) {
        return (0, date_1.createDateSchema)(zodSchema);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodPipeline')) {
        return (0, pipeline_1.createPipelineSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodEffects') &&
        zodSchema._def.effect.type === 'transform') {
        return (0, transform_1.createTransformSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodEffects') &&
        zodSchema._def.effect.type === 'preprocess') {
        return (0, preprocess_1.createPreprocessSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodEffects') &&
        zodSchema._def.effect.type === 'refinement') {
        return (0, refine_1.createRefineSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodNativeEnum')) {
        return (0, nativeEnum_1.createNativeEnumSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodIntersection')) {
        return (0, intersection_1.createIntersectionSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodCatch')) {
        return (0, catch_1.createCatchSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodUnknown') || (0, zodType_1.isZodType)(zodSchema, 'ZodAny')) {
        return (0, unknown_1.createUnknownSchema)(zodSchema);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodLazy')) {
        return (0, lazy_1.createLazySchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodBranded')) {
        return (0, brand_1.createBrandedSchema)(zodSchema, state);
    }
    if ((0, zodType_1.isZodType)(zodSchema, 'ZodSet')) {
        return (0, set_1.createSetSchema)(zodSchema, state);
    }
    return (0, manual_1.createManualTypeSchema)(zodSchema, state);
};
exports.createSchemaSwitch = createSchemaSwitch;
//# sourceMappingURL=index.js.map
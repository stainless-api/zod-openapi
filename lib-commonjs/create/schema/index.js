"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchemaOrRef = exports.createSchemaWithMetadata = exports.createSchema = exports.newSchemaState = void 0;
const zod_1 = require("zod");
const components_1 = require("../components");
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
const metadata_1 = require("./metadata");
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
const newSchemaState = (state) => ({
    type: state.type,
    components: state.components,
    path: [...state.path],
    visited: new Set(state.visited),
});
exports.newSchemaState = newSchemaState;
const createSchema = (zodSchema, state, subpath) => {
    state.path.push(...subpath);
    if (state.visited.has(zodSchema)) {
        throw new Error(`The schema at ${state.path.join(' > ')} needs to be registered because it's circularly referenced`);
    }
    state.visited.add(zodSchema);
    const schema = (0, exports.createSchemaWithMetadata)(zodSchema, state);
    return schema;
};
exports.createSchema = createSchema;
const createSchemaWithMetadata = (zodSchema, state) => {
    const { effectType, param, header, ref, refType, ...additionalMetadata } = zodSchema._def.openapi ?? {};
    const schemaOrRef = createSchemaSwitch(zodSchema, state);
    const description = zodSchema.description;
    return (0, metadata_1.enhanceWithMetadata)(schemaOrRef, {
        ...(description && { description }),
        ...additionalMetadata,
    });
};
exports.createSchemaWithMetadata = createSchemaWithMetadata;
const createSchemaSwitch = (zodSchema, state) => {
    if (zodSchema._def.openapi?.type) {
        return (0, manual_1.createManualTypeSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodString) {
        return (0, string_1.createStringSchema)(zodSchema);
    }
    if (zodSchema instanceof zod_1.ZodNumber) {
        return (0, number_1.createNumberSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodBoolean) {
        return (0, boolean_1.createBooleanSchema)(zodSchema);
    }
    if (zodSchema instanceof zod_1.ZodEnum) {
        return (0, enum_1.createEnumSchema)(zodSchema);
    }
    if (zodSchema instanceof zod_1.ZodLiteral) {
        return (0, literal_1.createLiteralSchema)(zodSchema);
    }
    if (zodSchema instanceof zod_1.ZodNativeEnum) {
        return (0, nativeEnum_1.createNativeEnumSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodArray) {
        return (0, array_1.createArraySchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodObject) {
        return (0, object_1.createObjectSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodUnion) {
        return (0, union_1.createUnionSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodDiscriminatedUnion) {
        return (0, discriminatedUnion_1.createDiscriminatedUnionSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodNull) {
        return (0, null_1.createNullSchema)(zodSchema);
    }
    if (zodSchema instanceof zod_1.ZodNullable) {
        return (0, nullable_1.createNullableSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodOptional) {
        return (0, optional_1.createOptionalSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodDefault) {
        return (0, default_1.createDefaultSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodRecord) {
        return (0, record_1.createRecordSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodTuple) {
        return (0, tuple_1.createTupleSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodDate) {
        return (0, date_1.createDateSchema)(zodSchema);
    }
    if (zodSchema instanceof zod_1.ZodPipeline) {
        return (0, pipeline_1.createPipelineSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodEffects &&
        zodSchema._def.effect.type === 'transform') {
        return (0, transform_1.createTransformSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodEffects &&
        zodSchema._def.effect.type === 'preprocess') {
        return (0, preprocess_1.createPreprocessSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodEffects &&
        zodSchema._def.effect.type === 'refinement') {
        return (0, refine_1.createRefineSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodNativeEnum) {
        return (0, nativeEnum_1.createNativeEnumSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodIntersection) {
        return (0, intersection_1.createIntersectionSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodCatch) {
        return (0, catch_1.createCatchSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodUnknown) {
        return (0, unknown_1.createUnknownSchema)(zodSchema);
    }
    if (zodSchema instanceof zod_1.ZodLazy) {
        return (0, lazy_1.createLazySchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodBranded) {
        return (0, brand_1.createBrandedSchema)(zodSchema, state);
    }
    if (zodSchema instanceof zod_1.ZodSet) {
        return (0, set_1.createSetSchema)(zodSchema, state);
    }
    return (0, manual_1.createManualTypeSchema)(zodSchema, state);
};
const createSchemaOrRef = (zodSchema, state, subpath) => {
    const component = state.components.schemas.get(zodSchema);
    if (component && component.type === 'complete') {
        if (component.creationType && component.creationType !== state.type) {
            throw new Error(`schemaRef "${component.ref}" was created with a ZodTransform meaning that the input type is different from the output type. This type is currently being referenced in a response and request. Wrap it in a ZodPipeline, assign it a manual type or effectType`);
        }
        return {
            $ref: (0, components_1.createComponentSchemaRef)(component.ref),
        };
    }
    if (component && component.type === 'inProgress') {
        return {
            $ref: (0, components_1.createComponentSchemaRef)(component.ref),
        };
    }
    const schemaRef = zodSchema._def.openapi?.ref ?? component?.ref;
    let newState;
    if (zodSchema._def.openapi?.ref || component?.type === 'partial') {
        state.components.schemas.set(zodSchema, {
            type: 'inProgress',
            ref: (zodSchema._def.openapi?.ref ?? component?.ref),
        });
        newState = (0, exports.newSchemaState)({ ...state, path: [], visited: new Set() });
    }
    else {
        newState = (0, exports.newSchemaState)(state);
    }
    const schemaOrRef = (0, exports.createSchema)(zodSchema, newState, subpath);
    if (newState.effectType) {
        if (state.effectType && newState.effectType !== state.effectType) {
            (0, transform_1.throwTransformError)(zodSchema, newState);
        }
        state.effectType = newState.effectType;
    }
    if (schemaRef) {
        state.components.schemas.set(zodSchema, {
            type: 'complete',
            ref: schemaRef,
            schemaObject: schemaOrRef,
            ...(newState.effectType && { creationType: newState.effectType }),
        });
        return {
            $ref: (0, components_1.createComponentSchemaRef)(schemaRef),
        };
    }
    return schemaOrRef;
};
exports.createSchemaOrRef = createSchemaOrRef;
//# sourceMappingURL=index.js.map
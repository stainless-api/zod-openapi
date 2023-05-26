"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapProperties = exports.mapRequired = exports.createObjectSchemaFromShape = exports.createExtendedSchema = exports.createObjectSchema = void 0;
const zod_1 = require("zod");
const components_1 = require("../components");
const optional_1 = require("./optional");
const _1 = require(".");
const createObjectSchema = (zodObject, state) => {
    const extendedSchema = (0, exports.createExtendedSchema)(zodObject, zodObject._def.extendMetadata?.extends, state);
    if (extendedSchema) {
        return extendedSchema;
    }
    return (0, exports.createObjectSchemaFromShape)(zodObject.shape, {
        unknownKeys: zodObject._def.unknownKeys,
        catchAll: zodObject._def.catchall,
    }, state);
};
exports.createObjectSchema = createObjectSchema;
const createExtendedSchema = (zodObject, baseZodObject, state) => {
    if (!baseZodObject) {
        return undefined;
    }
    const component = state.components.schemas.get(baseZodObject);
    if (component || baseZodObject._def.openapi?.ref) {
        (0, _1.createSchemaOrRef)(baseZodObject, state, ['extended schema']);
    }
    const completeComponent = state.components.schemas.get(baseZodObject);
    if (!completeComponent) {
        return undefined;
    }
    const diffOpts = createDiffOpts({
        unknownKeys: baseZodObject._def.unknownKeys,
        catchAll: baseZodObject._def.catchall,
    }, {
        unknownKeys: zodObject._def.unknownKeys,
        catchAll: zodObject._def.catchall,
    });
    if (!diffOpts) {
        return undefined;
    }
    const diffShape = createShapeDiff(baseZodObject._def.shape(), zodObject._def.shape());
    if (!diffShape) {
        return undefined;
    }
    return {
        allOf: [{ $ref: (0, components_1.createComponentSchemaRef)(completeComponent.ref) }],
        ...(0, exports.createObjectSchemaFromShape)(diffShape, diffOpts, state),
    };
};
exports.createExtendedSchema = createExtendedSchema;
const createDiffOpts = (baseOpts, extendedOpts) => {
    if (baseOpts.unknownKeys === 'strict' ||
        !(baseOpts.catchAll instanceof zod_1.ZodNever)) {
        return undefined;
    }
    return {
        catchAll: extendedOpts.catchAll,
        unknownKeys: extendedOpts.unknownKeys,
    };
};
const createShapeDiff = (baseObj, extendedObj) => {
    const acc = {};
    for (const [key, val] of Object.entries(extendedObj)) {
        const baseValue = baseObj[key];
        if (val === baseValue) {
            continue;
        }
        if (baseValue === undefined) {
            acc[key] = extendedObj[key];
            continue;
        }
        return null;
    }
    return acc;
};
const createObjectSchemaFromShape = (shape, { unknownKeys, catchAll }, state) => {
    const properties = (0, exports.mapProperties)(shape, state);
    const required = (0, exports.mapRequired)(shape, state);
    return {
        type: 'object',
        ...(properties && { properties }),
        ...(required && { required }),
        ...(unknownKeys === 'strict' && { additionalProperties: false }),
        ...(!(catchAll instanceof zod_1.ZodNever) && {
            additionalProperties: (0, _1.createSchemaOrRef)(catchAll, state, [
                'additional properties',
            ]),
        }),
    };
};
exports.createObjectSchemaFromShape = createObjectSchemaFromShape;
const mapRequired = (shape, state) => {
    const required = Object.entries(shape)
        .filter(([_key, zodSchema]) => !(0, optional_1.isOptionalSchema)(zodSchema, state))
        .map(([key]) => key);
    if (!required.length) {
        return undefined;
    }
    return required;
};
exports.mapRequired = mapRequired;
const mapProperties = (shape, state) => Object.entries(shape).reduce((acc, [key, zodSchema]) => {
    acc[key] = (0, _1.createSchemaOrRef)(zodSchema, state, [`property: ${key}`]);
    return acc;
}, {});
exports.mapProperties = mapProperties;
//# sourceMappingURL=object.js.map
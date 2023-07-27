import { isZodType } from '../../../zodType';
import { createComponentSchemaRef } from '../../components';
import { createSchemaObject } from '../../schema';
import { isOptionalSchema } from './optional';
export const createObjectSchema = (zodObject, state) => {
    const extendedSchema = createExtendedSchema(zodObject, zodObject._def.extendMetadata?.extends, state);
    if (extendedSchema) {
        return extendedSchema;
    }
    return createObjectSchemaFromShape(zodObject.shape, {
        unknownKeys: zodObject._def.unknownKeys,
        catchAll: zodObject._def.catchall,
    }, state);
};
export const createExtendedSchema = (zodObject, baseZodObject, state) => {
    if (!baseZodObject) {
        return undefined;
    }
    const component = state.components.schemas.get(baseZodObject);
    if (component || baseZodObject._def.openapi?.ref) {
        createSchemaObject(baseZodObject, state, ['extended schema']);
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
        allOf: [{ $ref: createComponentSchemaRef(completeComponent.ref) }],
        ...createObjectSchemaFromShape(diffShape, diffOpts, state),
    };
};
const createDiffOpts = (baseOpts, extendedOpts) => {
    if (baseOpts.unknownKeys === 'strict' ||
        !isZodType(baseOpts.catchAll, 'ZodNever')) {
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
export const createObjectSchemaFromShape = (shape, { unknownKeys, catchAll }, state) => {
    const properties = mapProperties(shape, state);
    const required = mapRequired(shape, state);
    return {
        type: 'object',
        ...(properties && { properties }),
        ...(required && { required }),
        ...(unknownKeys === 'strict' && { additionalProperties: false }),
        ...(!isZodType(catchAll, 'ZodNever') && {
            additionalProperties: createSchemaObject(catchAll, state, [
                'additional properties',
            ]),
        }),
    };
};
export const mapRequired = (shape, state) => {
    const required = Object.entries(shape)
        .filter(([_key, zodSchema]) => !isOptionalSchema(zodSchema, state))
        .map(([key]) => key);
    if (!required.length) {
        return undefined;
    }
    return required;
};
export const mapProperties = (shape, state) => Object.entries(shape).reduce((acc, [key, zodSchema]) => {
    acc[key] = createSchemaObject(zodSchema, state, [`property: ${key}`]);
    return acc;
}, {});
//# sourceMappingURL=object.js.map
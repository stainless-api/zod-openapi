"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDiscriminator = exports.createDiscriminatedUnionSchema = void 0;
const zodType_1 = require("../../../zodType");
const schema_1 = require("../../schema");
const createDiscriminatedUnionSchema = (zodDiscriminatedUnion, state) => {
    const options = zodDiscriminatedUnion.options;
    const schemas = options.map((option, index) => (0, schema_1.createSchemaObject)(option, state, [`discriminated union option ${index}`]));
    const discriminator = (0, exports.mapDiscriminator)(schemas, options, zodDiscriminatedUnion.discriminator, state);
    return {
        oneOf: schemas,
        ...(discriminator && { discriminator }),
    };
};
exports.createDiscriminatedUnionSchema = createDiscriminatedUnionSchema;
const mapDiscriminator = (schemas, zodObjects, discriminator, state) => {
    if (typeof discriminator !== 'string') {
        return undefined;
    }
    const mapping = {};
    for (const [index, zodObject] of zodObjects.entries()) {
        const schema = schemas[index];
        const componentSchemaRef = '$ref' in schema ? schema?.$ref : undefined;
        if (!componentSchemaRef) {
            return undefined;
        }
        const value = zodObject.shape[discriminator];
        if ((0, zodType_1.isZodType)(value, 'ZodEnum')) {
            for (const enumValue of value._def.values) {
                mapping[enumValue] = componentSchemaRef;
            }
            continue;
        }
        const literalValue = (value?._def).value;
        if (typeof literalValue !== 'string') {
            throw new Error(`Discriminator ${discriminator} could not be found in on index ${index} of a discriminated union at ${state.path.join(' > ')}`);
        }
        mapping[literalValue] = componentSchemaRef;
    }
    return {
        propertyName: discriminator,
        mapping,
    };
};
exports.mapDiscriminator = mapDiscriminator;
//# sourceMappingURL=discriminatedUnion.js.map
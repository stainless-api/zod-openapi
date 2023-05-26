import { ZodEnum, } from 'zod';
import { createSchemaOrRef } from '.';
export const createDiscriminatedUnionSchema = (zodDiscriminatedUnion, state) => {
    const options = zodDiscriminatedUnion.options;
    const schemas = options.map((option, index) => createSchemaOrRef(option, state, [`discriminated union option ${index}`]));
    const discriminator = mapDiscriminator(schemas, options, zodDiscriminatedUnion.discriminator, state);
    return {
        oneOf: schemas,
        ...(discriminator && { discriminator }),
    };
};
export const mapDiscriminator = (schemas, zodObjects, discriminator, state) => {
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
        if (value instanceof ZodEnum) {
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
//# sourceMappingURL=discriminatedUnion.js.map
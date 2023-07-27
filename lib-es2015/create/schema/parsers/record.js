import { satisfiesVersion } from '../../../openapi';
import { createSchemaObject } from '../../schema';
export const createRecordSchema = (zodRecord, state) => {
    const additionalProperties = createSchemaObject(zodRecord.valueSchema, state, ['record value']);
    const keySchema = createSchemaObject(zodRecord.keySchema, state, [
        'record key',
    ]);
    const maybeComponent = '$ref' in keySchema &&
        state.components.schemas.get(zodRecord.keySchema);
    const maybeSchema = maybeComponent &&
        maybeComponent.type === 'complete' &&
        maybeComponent.schemaObject;
    const renderedKeySchema = maybeSchema || keySchema;
    if ('enum' in renderedKeySchema && renderedKeySchema.enum) {
        return {
            type: 'object',
            properties: renderedKeySchema.enum.reduce((acc, key) => {
                acc[key] = additionalProperties;
                return acc;
            }, {}),
            additionalProperties: false,
        };
    }
    if (satisfiesVersion(state.components.openapi, '3.1.0') &&
        'type' in renderedKeySchema &&
        renderedKeySchema.type === 'string' &&
        Object.keys(renderedKeySchema).length > 1) {
        return {
            type: 'object',
            // @ts-expect-error FIXME: https://github.com/metadevpro/openapi3-ts/pull/120
            propertyNames: keySchema,
            additionalProperties,
        };
    }
    return {
        type: 'object',
        additionalProperties,
    };
};
//# sourceMappingURL=record.js.map
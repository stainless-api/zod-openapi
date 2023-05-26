import { createSchemaOrRef } from '.';
export const createRecordSchema = (zodRecord, state) => ({
    type: 'object',
    additionalProperties: createSchemaOrRef(zodRecord.valueSchema, state, ['record value']),
});
//# sourceMappingURL=record.js.map
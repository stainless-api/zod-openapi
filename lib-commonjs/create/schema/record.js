"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecordSchema = void 0;
const _1 = require(".");
const createRecordSchema = (zodRecord, state) => ({
    type: 'object',
    additionalProperties: (0, _1.createSchemaOrRef)(zodRecord.valueSchema, state, ['record value']),
});
exports.createRecordSchema = createRecordSchema;
//# sourceMappingURL=record.js.map
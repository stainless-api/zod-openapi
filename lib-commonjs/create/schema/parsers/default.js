"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultSchema = void 0;
const schema_1 = require("../../schema");
const metadata_1 = require("../metadata");
const createDefaultSchema = (zodDefault, state) => {
    const schemaObject = (0, schema_1.createSchemaObject)(zodDefault._def.innerType, state, ['default']);
    return (0, metadata_1.enhanceWithMetadata)(schemaObject, {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        default: zodDefault._def.defaultValue(),
    });
};
exports.createDefaultSchema = createDefaultSchema;
//# sourceMappingURL=default.js.map
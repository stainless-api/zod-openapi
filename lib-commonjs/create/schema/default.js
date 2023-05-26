"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultSchema = void 0;
const metadata_1 = require("./metadata");
const _1 = require(".");
const createDefaultSchema = (zodDefault, state) => {
    const schemaOrRef = (0, _1.createSchemaOrRef)(zodDefault._def.innerType, state, ['default']);
    return (0, metadata_1.enhanceWithMetadata)(schemaOrRef, {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        default: zodDefault._def.defaultValue(),
    });
};
exports.createDefaultSchema = createDefaultSchema;
//# sourceMappingURL=default.js.map
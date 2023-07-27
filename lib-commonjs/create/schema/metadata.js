"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhanceWithMetadata = void 0;
const enhanceWithMetadata = (schemaObject, metadata) => {
    if ('$ref' in schemaObject) {
        if (Object.values(metadata).every((val) => val === undefined)) {
            return schemaObject;
        }
        return {
            allOf: [schemaObject, metadata],
        };
    }
    return {
        ...schemaObject,
        ...metadata,
    };
};
exports.enhanceWithMetadata = enhanceWithMetadata;
//# sourceMappingURL=metadata.js.map
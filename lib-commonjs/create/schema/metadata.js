"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhanceWithMetadata = void 0;
const enhanceWithMetadata = (schemaOrRef, metadata) => {
    if ('$ref' in schemaOrRef) {
        if (Object.values(metadata).every((val) => val === undefined)) {
            return schemaOrRef;
        }
        return {
            allOf: [schemaOrRef, metadata],
        };
    }
    return {
        ...schemaOrRef,
        ...metadata,
    };
};
exports.enhanceWithMetadata = enhanceWithMetadata;
//# sourceMappingURL=metadata.js.map
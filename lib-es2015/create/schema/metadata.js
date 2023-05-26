export const enhanceWithMetadata = (schemaOrRef, metadata) => {
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
//# sourceMappingURL=metadata.js.map
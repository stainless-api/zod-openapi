export const enhanceWithMetadata = (schemaObject, metadata) => {
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
//# sourceMappingURL=metadata.js.map
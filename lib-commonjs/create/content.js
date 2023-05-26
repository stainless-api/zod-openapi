"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContent = void 0;
const zod_1 = require("zod");
const schema_1 = require("./schema");
const createMediaTypeSchema = (schemaObject, components, type, subpath) => {
    if (!schemaObject) {
        return undefined;
    }
    if (!(schemaObject instanceof zod_1.ZodType)) {
        return schemaObject;
    }
    return (0, schema_1.createSchemaOrRef)(schemaObject, (0, schema_1.newSchemaState)({
        components,
        type,
        path: [],
        visited: new Set(),
    }), subpath);
};
const createMediaTypeObject = (mediaTypeObject, components, type, subpath) => {
    if (!mediaTypeObject) {
        return undefined;
    }
    return {
        ...mediaTypeObject,
        schema: createMediaTypeSchema(mediaTypeObject.schema, components, type, [
            ...subpath,
            'schema',
        ]),
    };
};
const createContent = (contentObject, components, type, subpath) => Object.entries(contentObject).reduce((acc, [mediaType, zodOpenApiMediaTypeObject]) => {
    const mediaTypeObject = createMediaTypeObject(zodOpenApiMediaTypeObject, components, type, [...subpath, mediaType]);
    if (mediaTypeObject) {
        acc[mediaType] = mediaTypeObject;
    }
    return acc;
}, {});
exports.createContent = createContent;
//# sourceMappingURL=content.js.map
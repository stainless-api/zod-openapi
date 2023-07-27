"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContent = exports.createMediaTypeSchema = void 0;
const zodType_1 = require("../zodType");
const schema_1 = require("./schema");
const createMediaTypeSchema = (schemaObject, components, type, subpath) => {
    if (!schemaObject) {
        return undefined;
    }
    if (!(0, zodType_1.isAnyZodType)(schemaObject)) {
        return schemaObject;
    }
    return (0, schema_1.createSchemaObject)(schemaObject, (0, schema_1.newSchemaState)({
        components,
        type,
        path: [],
        visited: new Set(),
    }), subpath);
};
exports.createMediaTypeSchema = createMediaTypeSchema;
const createMediaTypeObject = (mediaTypeObject, components, type, subpath) => {
    if (!mediaTypeObject) {
        return undefined;
    }
    return {
        ...mediaTypeObject,
        schema: (0, exports.createMediaTypeSchema)(mediaTypeObject.schema, components, type, [
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
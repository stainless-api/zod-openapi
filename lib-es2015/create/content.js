import { isAnyZodType } from '../zodType';
import { createSchemaObject, newSchemaState } from './schema';
export const createMediaTypeSchema = (schemaObject, components, type, subpath) => {
    if (!schemaObject) {
        return undefined;
    }
    if (!isAnyZodType(schemaObject)) {
        return schemaObject;
    }
    return createSchemaObject(schemaObject, newSchemaState({
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
export const createContent = (contentObject, components, type, subpath) => Object.entries(contentObject).reduce((acc, [mediaType, zodOpenApiMediaTypeObject]) => {
    const mediaTypeObject = createMediaTypeObject(zodOpenApiMediaTypeObject, components, type, [...subpath, mediaType]);
    if (mediaTypeObject) {
        acc[mediaType] = mediaTypeObject;
    }
    return acc;
}, {});
//# sourceMappingURL=content.js.map
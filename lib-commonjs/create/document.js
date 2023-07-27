"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocument = exports.getZodObject = void 0;
const components_1 = require("./components");
const paths_1 = require("./paths");
const zodType_1 = require("../zodType");
function getZodObject(schema) {
    if ((0, zodType_1.isZodType)(schema, 'ZodObject')) {
        return schema;
    }
    if ((0, zodType_1.isZodType)(schema, 'ZodLazy')) {
        return getZodObject(schema.schema);
    }
    if ((0, zodType_1.isZodType)(schema, 'ZodEffects')) {
        return getZodObject(schema.innerType());
    }
    if ((0, zodType_1.isZodType)(schema, 'ZodBranded')) {
        return getZodObject(schema.unwrap());
    }
    if ((0, zodType_1.isZodType)(schema, 'ZodPipeline')) {
        return getZodObject(schema._def.out);
    }
    throw new Error('failed to find ZodObject in schema');
}
exports.getZodObject = getZodObject;
const createDocument = (zodOpenApiObject) => {
    const { paths, webhooks, components = {}, ...rest } = zodOpenApiObject;
    const defaultComponents = (0, components_1.getDefaultComponents)(components, zodOpenApiObject.openapi);
    const createdPaths = (0, paths_1.createPaths)(paths, defaultComponents);
    const createdWebhooks = (0, paths_1.createPaths)(webhooks, defaultComponents);
    const createdComponents = (0, components_1.createComponents)(components, defaultComponents);
    return {
        ...rest,
        ...(createdPaths && { paths: createdPaths }),
        ...(createdWebhooks && { webhooks: createdWebhooks }),
        ...(createdComponents && { components: createdComponents }),
    };
};
exports.createDocument = createDocument;
//# sourceMappingURL=document.js.map
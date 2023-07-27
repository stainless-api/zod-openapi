import { createComponents, getDefaultComponents } from './components';
import { createPaths } from './paths';
import { isZodType } from '../zodType';
export function getZodObject(schema) {
    if (isZodType(schema, 'ZodObject')) {
        return schema;
    }
    if (isZodType(schema, 'ZodLazy')) {
        return getZodObject(schema.schema);
    }
    if (isZodType(schema, 'ZodEffects')) {
        return getZodObject(schema.innerType());
    }
    if (isZodType(schema, 'ZodBranded')) {
        return getZodObject(schema.unwrap());
    }
    if (isZodType(schema, 'ZodPipeline')) {
        return getZodObject(schema._def.out);
    }
    throw new Error('failed to find ZodObject in schema');
}
export const createDocument = (zodOpenApiObject) => {
    const { paths, webhooks, components = {}, ...rest } = zodOpenApiObject;
    const defaultComponents = getDefaultComponents(components, zodOpenApiObject.openapi);
    const createdPaths = createPaths(paths, defaultComponents);
    const createdWebhooks = createPaths(webhooks, defaultComponents);
    const createdComponents = createComponents(components, defaultComponents);
    return {
        ...rest,
        ...(createdPaths && { paths: createdPaths }),
        ...(createdWebhooks && { webhooks: createdWebhooks }),
        ...(createdComponents && { components: createdComponents }),
    };
};
//# sourceMappingURL=document.js.map
import { createComponents, getDefaultComponents } from './components';
import { createPaths } from './paths';
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
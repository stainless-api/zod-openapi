"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocument = void 0;
const components_1 = require("./components");
const paths_1 = require("./paths");
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
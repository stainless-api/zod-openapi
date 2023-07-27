import type { oas31 } from '../openapi3-ts/dist';
import { type ComponentsObject } from './components';
import type { ZodOpenApiPathsObject, ZodOpenApiRequestBodyObject } from './document';
export declare const createRequestBody: (requestBodyObject: ZodOpenApiRequestBodyObject | undefined, components: ComponentsObject, subpath: string[]) => oas31.ReferenceObject | oas31.RequestBodyObject | undefined;
export declare const createPaths: (pathsObject: ZodOpenApiPathsObject | undefined, components: ComponentsObject) => oas31.PathsObject | undefined;

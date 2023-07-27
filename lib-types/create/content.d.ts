import type { ZodType } from 'zod';
import type { oas31 } from '../openapi3-ts/dist';
import type { ComponentsObject, CreationType } from './components';
import type { ZodOpenApiContentObject } from './document';
export declare const createMediaTypeSchema: (schemaObject: ZodType | oas31.SchemaObject | oas31.ReferenceObject | undefined, components: ComponentsObject, type: CreationType, subpath: string[]) => oas31.SchemaObject | oas31.ReferenceObject | undefined;
export declare const createContent: (contentObject: ZodOpenApiContentObject, components: ComponentsObject, type: CreationType, subpath: string[]) => oas31.ContentObject;

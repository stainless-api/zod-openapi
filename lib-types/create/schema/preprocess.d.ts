import type { ZodEffects } from 'zod';
import type { oas31 } from '../../openapi3-ts/dist';
import { type SchemaState } from '.';
export declare const createPreprocessSchema: (zodPreprocess: ZodEffects<any, any, any>, state: SchemaState) => oas31.SchemaObject | oas31.ReferenceObject;

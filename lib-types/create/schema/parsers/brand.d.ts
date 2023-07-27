import type { ZodBranded } from 'zod';
import type { oas31 } from '../../../openapi3-ts/dist';
import { type SchemaState } from '../../schema';
export declare const createBrandedSchema: (zodBranded: ZodBranded<any, any>, state: SchemaState) => oas31.SchemaObject | oas31.ReferenceObject;

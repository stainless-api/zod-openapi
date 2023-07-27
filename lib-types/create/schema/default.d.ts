import type { ZodDefault } from 'zod';
import type { oas31 } from '../../openapi3-ts/dist';
import { type SchemaState } from '.';
export declare const createDefaultSchema: (zodDefault: ZodDefault<any>, state: SchemaState) => oas31.SchemaObject | oas31.ReferenceObject;

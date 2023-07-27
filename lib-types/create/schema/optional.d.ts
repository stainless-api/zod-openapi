import { ZodOptional, type ZodTypeAny } from 'zod';
import type { oas31 } from '../../openapi3-ts/dist';
import { type SchemaState } from '.';
export declare const createOptionalSchema: (zodOptional: ZodOptional<any>, state: SchemaState) => oas31.SchemaObject | oas31.ReferenceObject;
export declare const isOptionalSchema: (zodSchema: ZodTypeAny, state: SchemaState) => boolean;

import type { ZodNullable } from 'zod';
import type { oas31 } from '../../openapi3-ts/dist';
import { type SchemaState } from '.';
export declare const createNullableSchema: (zodNullable: ZodNullable<any>, state: SchemaState) => oas31.SchemaObject;

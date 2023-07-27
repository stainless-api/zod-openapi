import type { ZodSet } from 'zod';
import type { oas31 } from '../../../openapi3-ts/dist';
import { type SchemaState } from '../../schema';
export declare const createSetSchema: (zodSet: ZodSet<any>, state: SchemaState) => oas31.SchemaObject;

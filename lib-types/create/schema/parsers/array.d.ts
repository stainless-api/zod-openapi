import type { ZodArray } from 'zod';
import type { oas31 } from '../../../openapi3-ts/dist';
import { type SchemaState } from '../../schema';
export declare const createArraySchema: (zodArray: ZodArray<any, any>, state: SchemaState) => oas31.SchemaObject;

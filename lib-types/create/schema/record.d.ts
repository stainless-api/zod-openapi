import type { ZodRecord } from 'zod';
import type { oas31 } from '../../openapi3-ts/dist';
import { type SchemaState } from '.';
export declare const createRecordSchema: (zodRecord: ZodRecord<any, any>, state: SchemaState) => oas31.SchemaObject;

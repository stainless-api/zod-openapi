import type { ZodTuple } from 'zod';
import type { oas31 } from '../../openapi3-ts/dist';
import { type SchemaState } from '.';
export declare const createTupleSchema: (zodTuple: ZodTuple<any, any>, state: SchemaState) => oas31.SchemaObject;

import { type ZodType, type ZodTypeDef } from 'zod';
import type { oas31 } from '../../openapi3-ts/dist';
import type { SchemaState } from '.';
export declare const createManualTypeSchema: <Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(zodSchema: ZodType<Output, Def, Input>, state: SchemaState) => oas31.SchemaObject;

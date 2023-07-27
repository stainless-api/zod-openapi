import type { UnknownKeysParam, ZodObject, ZodRawShape, ZodType } from 'zod';
import type { oas31 } from '../../../openapi3-ts/dist';
import { type SchemaState } from '../../schema';
export declare const createObjectSchema: <T extends ZodRawShape, UnknownKeys extends UnknownKeysParam = UnknownKeysParam>(zodObject: ZodObject<T, UnknownKeys, any, any, any>, state: SchemaState) => oas31.SchemaObject;
export declare const createExtendedSchema: (zodObject: ZodObject<any, any, any, any, any>, baseZodObject: ZodObject<any, any, any, any, any> | undefined, state: SchemaState) => oas31.SchemaObject | undefined;
interface AdditionalPropertyOptions {
    unknownKeys?: UnknownKeysParam;
    catchAll: ZodType;
}
export declare const createObjectSchemaFromShape: (shape: ZodRawShape, { unknownKeys, catchAll }: AdditionalPropertyOptions, state: SchemaState) => oas31.SchemaObject;
export declare const mapRequired: (shape: ZodRawShape, state: SchemaState) => oas31.SchemaObject['required'];
export declare const mapProperties: (shape: ZodRawShape, state: SchemaState) => oas31.SchemaObject['properties'];
export {};

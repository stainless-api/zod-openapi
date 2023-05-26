import type { ZodEnum } from 'zod';
import type { oas31 } from '../../openapi3-ts/dist';
export declare const createEnumSchema: (zodEnum: ZodEnum<any>) => oas31.SchemaObject;

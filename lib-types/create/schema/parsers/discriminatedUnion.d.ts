import type { AnyZodObject, ZodDiscriminatedUnion } from 'zod';
import type { oas31 } from '../../../openapi3-ts/dist';
import { type SchemaState } from '../../schema';
export declare const createDiscriminatedUnionSchema: (zodDiscriminatedUnion: ZodDiscriminatedUnion<any, any>, state: SchemaState) => oas31.SchemaObject;
export declare const mapDiscriminator: (schemas: (oas31.SchemaObject | oas31.ReferenceObject)[], zodObjects: AnyZodObject[], discriminator: unknown, state: SchemaState) => oas31.SchemaObject['discriminator'];

import type { ZodEffects, ZodType } from 'zod';
import type { oas31 } from '../../../openapi3-ts/dist';
import { type SchemaState } from '../../schema';
export declare const createTransformSchema: (zodTransform: ZodEffects<any, any, any>, state: SchemaState) => oas31.SchemaObject | oas31.ReferenceObject;
export declare const throwTransformError: (zodType: ZodType, state: SchemaState) => never;

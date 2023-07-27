import type { ZodPipeline } from 'zod';
import type { oas31 } from '../../../openapi3-ts/dist';
import { type SchemaState } from '../../schema';
export declare const createPipelineSchema: (zodPipeline: ZodPipeline<any, any>, state: SchemaState) => oas31.SchemaObject | oas31.ReferenceObject;

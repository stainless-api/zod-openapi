import type { ZodIntersection } from 'zod';
import type { oas31 } from '../../openapi3-ts/dist';
import { type SchemaState } from '.';
export declare const createIntersectionSchema: (zodIntersection: ZodIntersection<any, any>, state: SchemaState) => oas31.SchemaObject | oas31.ReferenceObject;

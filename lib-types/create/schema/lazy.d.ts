import type { ZodLazy } from 'zod';
import type { oas31 } from '../../openapi3-ts/dist';
import { type SchemaState } from '.';
export declare const createLazySchema: (zodLazy: ZodLazy<any>, state: SchemaState) => oas31.ReferenceObject | oas31.SchemaObject;

import type { ZodUnion } from 'zod';
import type { oas31 } from '../../../openapi3-ts/dist';
import { type SchemaState } from '../../schema';
export declare const createUnionSchema: (zodUnion: ZodUnion<any>, state: SchemaState) => oas31.SchemaObject;

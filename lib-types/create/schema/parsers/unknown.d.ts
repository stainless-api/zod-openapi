import type { ZodAny, ZodUnknown } from 'zod';
import type { oas31 } from '../../../openapi3-ts/dist';
export declare const createUnknownSchema: (_zodUnknown: ZodUnknown | ZodAny) => oas31.SchemaObject;

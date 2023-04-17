import { oas31 } from 'openapi3-ts';
import { ZodCatch, ZodType } from 'zod';

import { SchemaState, createSchemaOrRef } from '.';

export const createCatchSchema = (
  zodCatch: ZodCatch<any>,
  state: SchemaState,
): oas31.SchemaObject | oas31.ReferenceObject =>
  createSchemaOrRef(zodCatch._def.innerType as ZodType, state);
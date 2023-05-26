import { type ZodType, type ZodTypeDef } from 'zod';
import type { oas31 } from '../../openapi3-ts/dist';
import { type ComponentsObject, type CreationType } from '../components';
export type LazyMap = Map<ZodType, true>;
export interface SchemaState {
    components: ComponentsObject;
    type: CreationType;
    effectType?: CreationType;
    path: string[];
    visited: Set<ZodType>;
}
export declare const newSchemaState: (state: SchemaState) => SchemaState;
export declare const createSchema: <Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(zodSchema: ZodType<Output, Def, Input>, state: SchemaState, subpath: string[]) => oas31.SchemaObject | oas31.ReferenceObject;
export declare const createSchemaWithMetadata: <Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(zodSchema: ZodType<Output, Def, Input>, state: SchemaState) => oas31.SchemaObject | oas31.ReferenceObject;
export declare const createSchemaOrRef: <Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(zodSchema: ZodType<Output, Def, Input>, state: SchemaState, subpath: string[]) => oas31.ReferenceObject | oas31.SchemaObject;

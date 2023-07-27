import type { ZodType, ZodTypeDef } from 'zod';
import type { oas31 } from '../../openapi3-ts/dist';
import { type ComponentsObject, type CreationType, type SchemaComponent } from '../components';
export type LazyMap = Map<ZodType, true>;
export interface SchemaState {
    components: ComponentsObject;
    type: CreationType;
    effectType?: CreationType;
    path: string[];
    visited: Set<ZodType>;
}
export declare const newSchemaState: (state: SchemaState) => SchemaState;
export declare const createNewSchema: <Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(zodSchema: ZodType<Output, Def, Input>, newState: SchemaState, subpath: string[]) => Schema;
export declare const createNewRef: <Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(ref: string, zodSchema: ZodType<Output, Def, Input>, state: SchemaState, subpath: string[]) => Schema;
export declare const createExistingRef: <Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(zodSchema: ZodType<Output, Def, Input>, component: SchemaComponent | undefined, state: SchemaState, subpath: string[]) => Schema | undefined;
type Schema = {
    schema: oas31.ReferenceObject | oas31.SchemaObject;
    newState: SchemaState;
};
export declare const createSchemaOrRef: <Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(zodSchema: ZodType<Output, Def, Input>, state: SchemaState, subpath: string[]) => Schema;
export declare const createSchemaObject: <Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(zodSchema: ZodType<Output, Def, Input>, state: SchemaState, subpath: string[]) => oas31.ReferenceObject | oas31.SchemaObject;
export {};

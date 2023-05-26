import { ZodType } from 'zod';
import type { oas30, oas31 } from '../openapi3-ts/dist';
import type { ComponentsObject } from './components';
import type { ZodOpenApiParameters } from './document';
export declare const createComponentParamRef: (ref: string) => string;
export declare const createBaseParameter: (schema: ZodType, components: ComponentsObject, subpath: string[]) => oas31.BaseParameterObject;
export declare const createParamOrRef: (zodSchema: ZodType, components: ComponentsObject, subpath: string[], type?: keyof ZodOpenApiParameters, name?: string) => oas31.ParameterObject | oas31.ReferenceObject;
export declare const createManualParameters: (parameters: (oas31.ParameterObject | oas31.ReferenceObject | oas30.ParameterObject | oas30.ReferenceObject | ZodType)[] | undefined, components: ComponentsObject, subpath: string[]) => (oas31.ParameterObject | oas31.ReferenceObject)[];
export declare const createParametersObject: (parameters: (oas31.ParameterObject | oas31.ReferenceObject | oas30.ParameterObject | oas30.ReferenceObject | ZodType)[] | undefined, requestParams: ZodOpenApiParameters | undefined, components: ComponentsObject, subpath: string[]) => (oas31.ParameterObject | oas31.ReferenceObject)[] | undefined;

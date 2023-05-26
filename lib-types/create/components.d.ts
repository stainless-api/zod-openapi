import { ZodType } from 'zod';
import type { oas30, oas31 } from '../openapi3-ts/dist';
import type { ZodOpenApiComponentsObject, ZodOpenApiRequestBodyObject, ZodOpenApiResponseObject, ZodOpenApiVersion } from './document';
export type CreationType = 'input' | 'output';
export interface CompleteSchemaComponent extends BaseSchemaComponent {
    type: 'complete';
    schemaObject: oas31.SchemaObject | oas31.ReferenceObject | oas30.SchemaObject | oas30.ReferenceObject;
    /** Set when the created schemaObject is specific to a particular CreationType */
    creationType?: CreationType;
}
export interface PartialSchemaComponent extends BaseSchemaComponent {
    type: 'partial';
}
export interface InProgressSchemaComponent extends BaseSchemaComponent {
    type: 'inProgress';
}
interface BaseSchemaComponent {
    ref: string;
}
export type SchemaComponent = CompleteSchemaComponent | PartialSchemaComponent | InProgressSchemaComponent;
export type SchemaComponentMap = Map<ZodType, SchemaComponent>;
export interface CompleteParameterComponent extends BaseParameterComponent {
    type: 'complete';
    paramObject: oas31.ParameterObject | oas31.ReferenceObject | oas30.ParameterObject | oas30.ReferenceObject;
}
export interface PartialParameterComponent extends BaseParameterComponent {
    type: 'partial';
}
interface BaseParameterComponent {
    ref: string;
    in: oas31.ParameterLocation;
    name: string;
}
export type ParameterComponent = CompleteParameterComponent | PartialParameterComponent;
export type ParameterComponentMap = Map<ZodType, ParameterComponent>;
export interface CompleteHeaderComponent extends BaseHeaderComponent {
    type: 'complete';
    headerObject: oas31.HeaderObject | oas31.ReferenceObject | oas30.HeaderObject | oas30.ReferenceObject;
}
export interface PartialHeaderComponent extends BaseHeaderComponent {
    type: 'partial';
}
interface BaseHeaderComponent {
    ref: string;
}
export type HeaderComponent = CompleteHeaderComponent | PartialHeaderComponent;
export type HeaderComponentMap = Map<ZodType, HeaderComponent>;
interface BaseResponseComponent {
    ref: string;
}
export interface CompleteResponseComponent extends BaseResponseComponent {
    type: 'complete';
    responseObject: oas31.ResponseObject | oas31.ReferenceObject | oas30.ResponseObject | oas30.ReferenceObject;
}
export interface PartialResponseComponent extends BaseResponseComponent {
    type: 'partial';
}
export type ResponseComponent = CompleteResponseComponent | PartialResponseComponent;
export type ResponseComponentMap = Map<ZodOpenApiResponseObject, ResponseComponent>;
interface BaseRequestBodyComponent {
    ref: string;
}
export interface CompleteRequestBodyComponent extends BaseRequestBodyComponent {
    type: 'complete';
    requestBodyObject: oas31.RequestBodyObject | oas31.ReferenceObject | oas30.RequestBodyObject | oas30.ReferenceObject;
}
export interface PartialRequestBodyComponent extends BaseRequestBodyComponent {
    type: 'partial';
}
export type RequestBodyComponent = CompleteRequestBodyComponent | PartialRequestBodyComponent;
export type RequestBodyComponentMap = Map<ZodOpenApiRequestBodyObject, RequestBodyComponent>;
export interface ComponentsObject {
    schemas: SchemaComponentMap;
    parameters: ParameterComponentMap;
    headers: HeaderComponentMap;
    requestBodies: RequestBodyComponentMap;
    responses: ResponseComponentMap;
    openapi: ZodOpenApiVersion;
}
export declare const getDefaultComponents: (componentsObject?: ZodOpenApiComponentsObject, openapi?: ZodOpenApiVersion) => ComponentsObject;
export declare const createComponentSchemaRef: (schemaRef: string) => string;
export declare const createComponentResponseRef: (responseRef: string) => string;
export declare const createComponentRequestBodyRef: (requestBodyRef: string) => string;
export declare const createComponents: (componentsObject: ZodOpenApiComponentsObject, components: ComponentsObject) => oas31.ComponentsObject | undefined;
export {};

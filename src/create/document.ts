import { oas31 } from 'openapi3-ts';
import { stringify } from 'yaml';
import { AnyZodObject } from 'zod';

import { getDefaultComponents } from './components';
import { createPaths } from './paths';

export interface ZodOpenApiMediaTypeObject
  extends Omit<oas31.MediaTypeObject, 'schema'> {
  schema?: AnyZodObject | oas31.SchemaObject | oas31.ReferenceObject;
}

export interface ZodOpenApiContentObject {
  [mediatype: string]: ZodOpenApiMediaTypeObject;
}

export interface ZodOpenApiRequestBodyObject
  extends Omit<oas31.RequestBodyObject, 'content'> {
  content: ZodOpenApiContentObject;
}

export interface ZodOpenApiResponseObject
  extends Omit<oas31.ResponseObject, 'content'> {
  content?: ZodOpenApiContentObject;
  responseHeaders?: AnyZodObject;
}

export interface ZodOpenApiResponsesObject
  extends oas31.ISpecificationExtension {
  default?: ZodOpenApiResponseObject | oas31.ReferenceObject;
  [statuscode: `${1 | 2 | 3 | 4 | 5}${string}`]:
    | ZodOpenApiResponseObject
    | oas31.ReferenceObject;
}

export type ZodOpenApiParameters = {
  [type in oas31.ParameterLocation]?: AnyZodObject;
};

export interface ZodOpenApiOperationObject
  extends Omit<oas31.OperationObject, 'requestBody' | 'responses'> {
  requestBody?: ZodOpenApiRequestBodyObject;
  requestParams?: ZodOpenApiParameters;
  responses: ZodOpenApiResponsesObject;
}

export interface ZodOpenApiPathItemObject
  extends Omit<
    oas31.PathItemObject,
    'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace'
  > {
  get?: ZodOpenApiOperationObject;
  put?: ZodOpenApiOperationObject;
  post?: ZodOpenApiOperationObject;
  delete?: ZodOpenApiOperationObject;
  options?: ZodOpenApiOperationObject;
  head?: ZodOpenApiOperationObject;
  patch?: ZodOpenApiOperationObject;
  trace?: ZodOpenApiOperationObject;
}

export interface ZodOpenApiPathsObject extends oas31.ISpecificationExtension {
  [path: string]: ZodOpenApiPathItemObject;
}

export interface ZodOpenApiObject
  extends Omit<oas31.OpenAPIObject, 'openapi' | 'paths' | 'webhooks'> {
  openapi: '3.1.0';
  paths?: ZodOpenApiPathsObject;
  webhooks?: ZodOpenApiPathsObject;
}

export const createDocument = (
  params: ZodOpenApiObject,
): oas31.OpenAPIObject => {
  const components = getDefaultComponents();
  return {
    ...params,
    paths: createPaths(params.paths, components),
    webhooks: createPaths(params.webhooks, components),
  };
};

export const createDocumentJson = (
  params: ZodOpenApiObject,
  jsonOptions?: {
    replacer?: Parameters<typeof JSON.stringify>[1];
    options?: Parameters<typeof JSON.stringify>[2];
  },
): string => {
  const document = createDocument(params);
  return JSON.stringify(
    document,
    jsonOptions?.replacer,
    jsonOptions?.options ?? 2,
  );
};

export const createDocumentYaml = (
  params: ZodOpenApiObject,
  yamlOptions: {
    replacer?: Parameters<typeof stringify>[1];
    options?: Parameters<typeof stringify>[2];
  } = {},
): string => {
  const documentJson = createDocumentJson(params);
  return stringify(documentJson, yamlOptions.replacer, yamlOptions.options);
};
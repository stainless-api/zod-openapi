import type { UnknownKeysParam, ZodDate, ZodObject, ZodRawShape, ZodTypeAny, z } from 'zod';
import type { CreationType } from './create/components';
import type { oas30, oas31 } from './openapi3-ts/dist';
type SchemaObject = oas30.SchemaObject & oas31.SchemaObject;
interface ZodOpenApiMetadata<T extends ZodTypeAny, TInferred = z.input<T> | z.output<T>> extends SchemaObject {
    example?: TInferred;
    examples?: [TInferred, ...TInferred[]];
    default?: T extends ZodDate ? string : TInferred;
    /**
     * Use this field to output this Zod Schema in the components schemas section. Any usage of this Zod Schema will then be transformed into a $ref.
     */
    ref?: string;
    /**
     * Use this field when you are manually adding a Zod Schema to the components section. This controls whether this should be rendered as request (`input`) or response (`output`). Defaults to `output`
     */
    refType?: CreationType;
    /**
     * Use this field to set the created type of an effect.
     */
    effectType?: CreationType;
    param?: Partial<oas31.ParameterObject> & {
        example?: TInferred;
        examples?: {
            [param: string]: (oas31.ExampleObject & {
                value: TInferred;
            }) | oas31.ReferenceObject;
        };
        /**
         * Use this field to output this Zod Schema in the components parameters section. Any usage of this Zod Schema will then be transformed into a $ref.
         */
        ref?: string;
    };
    header?: Partial<oas31.HeaderObject & oas30.HeaderObject> & {
        /**
         * Use this field to output this Zod Schema in the components headers section. Any usage of this Zod Schema will then be transformed into a $ref.
         */
        ref?: string;
    };
}
interface ZodOpenApiExtendMetadata {
    extends: ZodObject<any, any, any, any, any>;
}
declare module 'zod' {
    interface ZodType<Output, Def extends ZodTypeDef, Input = Output> {
        openapi<T extends ZodTypeAny>(this: T, metadata: ZodOpenApiMetadata<T>): T;
    }
    interface ZodTypeDef {
        openapi?: ZodOpenApiMetadata<ZodTypeAny>;
    }
    interface ZodObjectDef<T extends ZodRawShape = ZodRawShape, UnknownKeys extends UnknownKeysParam = UnknownKeysParam, Catchall extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
        extendMetadata?: ZodOpenApiExtendMetadata;
    }
}
export declare function extendZodWithOpenApi(zod: typeof z): void;
export {};

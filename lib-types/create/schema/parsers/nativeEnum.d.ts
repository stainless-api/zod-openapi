import type { EnumLike, ZodNativeEnum } from 'zod';
import type { oas31 } from '../../../openapi3-ts/dist';
import type { SchemaState } from '../../schema';
export declare const createNativeEnumSchema: <T extends EnumLike>(zodEnum: ZodNativeEnum<T>, state: SchemaState) => oas31.SchemaObject | oas31.ReferenceObject;
interface StringsAndNumbers {
    strings: string[];
    numbers: number[];
}
export declare const getValidEnumValues: (enumValues: EnumLike) => (string | number)[];
export declare const sortStringsAndNumbers: (values: (string | number)[]) => StringsAndNumbers;
export {};

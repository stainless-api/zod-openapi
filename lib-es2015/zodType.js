// Inspired by https://github.com/asteasolutions/zod-to-openapi/blob/master/src/lib/zod-is-type.ts
export const isZodType = (zodType, typeName) => zodType?._def?.typeName === typeName;
export const isAnyZodType = (zodType) => Boolean(zodType?._def?.typeName);
//# sourceMappingURL=zodType.js.map
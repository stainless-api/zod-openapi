"use strict";
// Inspired by https://github.com/asteasolutions/zod-to-openapi/blob/master/src/lib/zod-is-type.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAnyZodType = exports.isZodType = void 0;
const isZodType = (zodType, typeName) => zodType?._def?.typeName === typeName;
exports.isZodType = isZodType;
const isAnyZodType = (zodType) => Boolean(zodType?._def?.typeName);
exports.isAnyZodType = isAnyZodType;
//# sourceMappingURL=zodType.js.map
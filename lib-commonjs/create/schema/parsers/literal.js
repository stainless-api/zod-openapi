"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLiteralSchema = void 0;
const createLiteralSchema = (zodLiteral) => ({
    type: typeof zodLiteral.value,
    enum: [zodLiteral._def.value],
});
exports.createLiteralSchema = createLiteralSchema;
//# sourceMappingURL=literal.js.map
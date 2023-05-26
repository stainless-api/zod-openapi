export const createLiteralSchema = (zodLiteral) => ({
    type: typeof zodLiteral.value,
    enum: [zodLiteral._def.value],
});
//# sourceMappingURL=literal.js.map
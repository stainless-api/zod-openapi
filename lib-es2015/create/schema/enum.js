export const createEnumSchema = (zodEnum) => ({
    type: 'string',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    enum: zodEnum._def.values,
});
//# sourceMappingURL=enum.js.map
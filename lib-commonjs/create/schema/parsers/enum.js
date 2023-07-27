"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnumSchema = void 0;
const createEnumSchema = (zodEnum) => ({
    type: 'string',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    enum: zodEnum._def.values,
});
exports.createEnumSchema = createEnumSchema;
//# sourceMappingURL=enum.js.map
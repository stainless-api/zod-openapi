"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLazySchema = void 0;
const schema_1 = require("../../schema");
const createLazySchema = (zodLazy, state) => {
    const innerSchema = zodLazy._def.getter();
    return (0, schema_1.createSchemaObject)(innerSchema, state, ['lazy schema']);
};
exports.createLazySchema = createLazySchema;
//# sourceMappingURL=lazy.js.map
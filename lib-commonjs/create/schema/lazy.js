"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLazySchema = void 0;
const _1 = require(".");
const createLazySchema = (zodLazy, state) => {
    const innerSchema = zodLazy._def.getter();
    return (0, _1.createSchemaOrRef)(innerSchema, state, ['lazy schema']);
};
exports.createLazySchema = createLazySchema;
//# sourceMappingURL=lazy.js.map
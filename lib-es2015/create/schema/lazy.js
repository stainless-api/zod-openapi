import { createSchemaOrRef } from '.';
export const createLazySchema = (zodLazy, state) => {
    const innerSchema = zodLazy._def.getter();
    return createSchemaOrRef(innerSchema, state, ['lazy schema']);
};
//# sourceMappingURL=lazy.js.map
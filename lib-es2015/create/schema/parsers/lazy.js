import { createSchemaObject } from '../../schema';
export const createLazySchema = (zodLazy, state) => {
    const innerSchema = zodLazy._def.getter();
    return createSchemaObject(innerSchema, state, ['lazy schema']);
};
//# sourceMappingURL=lazy.js.map
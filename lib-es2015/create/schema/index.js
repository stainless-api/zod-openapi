import { createComponentSchemaRef, } from '../components';
import { enhanceWithMetadata } from './metadata';
import { createSchemaSwitch } from './parsers';
import { throwTransformError } from './parsers/transform';
export const newSchemaState = (state) => ({
    type: state.type,
    components: state.components,
    path: [...state.path],
    visited: new Set(state.visited),
});
export const createNewSchema = (zodSchema, newState, subpath) => {
    newState.path.push(...subpath);
    if (newState.visited.has(zodSchema)) {
        throw new Error(`The schema at ${newState.path.join(' > ')} needs to be registered because it's circularly referenced`);
    }
    newState.visited.add(zodSchema);
    const { effectType, param, header, ref, refType, ...additionalMetadata } = zodSchema._def.openapi ?? {};
    const schema = createSchemaSwitch(zodSchema, newState);
    const description = zodSchema.description;
    const schemaWithMetadata = enhanceWithMetadata(schema, {
        ...(description && { description }),
        ...additionalMetadata,
    });
    return {
        schema: schemaWithMetadata,
        newState,
    };
};
export const createNewRef = (ref, zodSchema, state, subpath) => {
    state.components.schemas.set(zodSchema, {
        type: 'in-progress',
        ref,
    });
    const newSchema = createNewSchema(zodSchema, newSchemaState({ ...state, visited: new Set() }), subpath);
    state.components.schemas.set(zodSchema, {
        type: 'complete',
        ref,
        schemaObject: newSchema.schema,
        creationType: newSchema.newState?.effectType,
    });
    return {
        schema: { $ref: createComponentSchemaRef(ref) },
        newState: newSchema.newState,
    };
};
export const createExistingRef = (zodSchema, component, state, subpath) => {
    const newState = newSchemaState(state);
    newState.path.push(...subpath);
    if (component && component.type === 'complete') {
        if (component.creationType && component.creationType !== state.type) {
            throwTransformError(zodSchema, newState);
        }
        return {
            schema: { $ref: createComponentSchemaRef(component.ref) },
            newState: {
                ...newState,
                effectType: component.creationType,
            },
        };
    }
    if (component && component.type === 'in-progress') {
        return {
            schema: { $ref: createComponentSchemaRef(component.ref) },
            newState,
        };
    }
    return;
};
export const createSchemaOrRef = (zodSchema, state, subpath) => {
    const component = state.components.schemas.get(zodSchema);
    const existingRef = createExistingRef(zodSchema, component, state, subpath);
    if (existingRef) {
        return existingRef;
    }
    const ref = zodSchema._def.openapi?.ref ?? component?.ref;
    if (ref) {
        return createNewRef(ref, zodSchema, state, subpath);
    }
    return createNewSchema(zodSchema, newSchemaState(state), subpath);
};
export const createSchemaObject = (zodSchema, state, subpath) => {
    const { schema, newState } = createSchemaOrRef(zodSchema, state, subpath);
    if (newState?.effectType) {
        if (state.type !== newState?.effectType ||
            (state.effectType && newState.effectType !== state.effectType)) {
            throwTransformError(zodSchema, newState);
        }
        state.effectType = newState.effectType;
    }
    return schema;
};
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchemaObject = exports.createSchemaOrRef = exports.createExistingRef = exports.createNewRef = exports.createNewSchema = exports.newSchemaState = void 0;
const components_1 = require("../components");
const metadata_1 = require("./metadata");
const parsers_1 = require("./parsers");
const transform_1 = require("./parsers/transform");
const newSchemaState = (state) => ({
    type: state.type,
    components: state.components,
    path: [...state.path],
    visited: new Set(state.visited),
});
exports.newSchemaState = newSchemaState;
const createNewSchema = (zodSchema, newState, subpath) => {
    newState.path.push(...subpath);
    if (newState.visited.has(zodSchema)) {
        throw new Error(`The schema at ${newState.path.join(' > ')} needs to be registered because it's circularly referenced`);
    }
    newState.visited.add(zodSchema);
    const { effectType, param, header, ref, refType, ...additionalMetadata } = zodSchema._def.openapi ?? {};
    const schema = (0, parsers_1.createSchemaSwitch)(zodSchema, newState);
    const description = zodSchema.description;
    const schemaWithMetadata = (0, metadata_1.enhanceWithMetadata)(schema, {
        ...(description && { description }),
        ...additionalMetadata,
    });
    return {
        schema: schemaWithMetadata,
        newState,
    };
};
exports.createNewSchema = createNewSchema;
const createNewRef = (ref, zodSchema, state, subpath) => {
    state.components.schemas.set(zodSchema, {
        type: 'in-progress',
        ref,
    });
    const newSchema = (0, exports.createNewSchema)(zodSchema, (0, exports.newSchemaState)({ ...state, visited: new Set() }), subpath);
    state.components.schemas.set(zodSchema, {
        type: 'complete',
        ref,
        schemaObject: newSchema.schema,
        creationType: newSchema.newState?.effectType,
    });
    return {
        schema: { $ref: (0, components_1.createComponentSchemaRef)(ref) },
        newState: newSchema.newState,
    };
};
exports.createNewRef = createNewRef;
const createExistingRef = (zodSchema, component, state, subpath) => {
    const newState = (0, exports.newSchemaState)(state);
    newState.path.push(...subpath);
    if (component && component.type === 'complete') {
        if (component.creationType && component.creationType !== state.type) {
            (0, transform_1.throwTransformError)(zodSchema, newState);
        }
        return {
            schema: { $ref: (0, components_1.createComponentSchemaRef)(component.ref) },
            newState: {
                ...newState,
                effectType: component.creationType,
            },
        };
    }
    if (component && component.type === 'in-progress') {
        return {
            schema: { $ref: (0, components_1.createComponentSchemaRef)(component.ref) },
            newState,
        };
    }
    return;
};
exports.createExistingRef = createExistingRef;
const createSchemaOrRef = (zodSchema, state, subpath) => {
    const component = state.components.schemas.get(zodSchema);
    const existingRef = (0, exports.createExistingRef)(zodSchema, component, state, subpath);
    if (existingRef) {
        return existingRef;
    }
    const ref = zodSchema._def.openapi?.ref ?? component?.ref;
    if (ref) {
        return (0, exports.createNewRef)(ref, zodSchema, state, subpath);
    }
    return (0, exports.createNewSchema)(zodSchema, (0, exports.newSchemaState)(state), subpath);
};
exports.createSchemaOrRef = createSchemaOrRef;
const createSchemaObject = (zodSchema, state, subpath) => {
    const { schema, newState } = (0, exports.createSchemaOrRef)(zodSchema, state, subpath);
    if (newState?.effectType) {
        if (state.type !== newState?.effectType ||
            (state.effectType && newState.effectType !== state.effectType)) {
            (0, transform_1.throwTransformError)(zodSchema, newState);
        }
        state.effectType = newState.effectType;
    }
    return schema;
};
exports.createSchemaObject = createSchemaObject;
//# sourceMappingURL=index.js.map
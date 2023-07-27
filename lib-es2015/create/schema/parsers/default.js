import { createSchemaObject } from '../../schema';
import { enhanceWithMetadata } from '../metadata';
export const createDefaultSchema = (zodDefault, state) => {
    const schemaObject = createSchemaObject(zodDefault._def.innerType, state, ['default']);
    return enhanceWithMetadata(schemaObject, {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        default: zodDefault._def.defaultValue(),
    });
};
//# sourceMappingURL=default.js.map
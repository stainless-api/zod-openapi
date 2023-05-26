import { enhanceWithMetadata } from './metadata';
import { createSchemaOrRef } from '.';
export const createDefaultSchema = (zodDefault, state) => {
    const schemaOrRef = createSchemaOrRef(zodDefault._def.innerType, state, ['default']);
    return enhanceWithMetadata(schemaOrRef, {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        default: zodDefault._def.defaultValue(),
    });
};
//# sourceMappingURL=default.js.map
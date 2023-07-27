import { createSchemaObject } from '../../schema';
export const createIntersectionSchema = (zodIntersection, state) => ({
    allOf: [
        createSchemaObject(zodIntersection._def.left, state, [
            'intersection left',
        ]),
        createSchemaObject(zodIntersection._def.right, state, [
            'intersection right',
        ]),
    ],
});
//# sourceMappingURL=intersection.js.map
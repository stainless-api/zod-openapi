import { createSchemaOrRef } from '.';
export const createIntersectionSchema = (zodIntersection, state) => ({
    allOf: [
        createSchemaOrRef(zodIntersection._def.left, state, [
            'intersection left',
        ]),
        createSchemaOrRef(zodIntersection._def.right, state, [
            'intersection right',
        ]),
    ],
});
//# sourceMappingURL=intersection.js.map
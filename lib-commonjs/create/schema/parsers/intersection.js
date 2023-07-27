"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIntersectionSchema = void 0;
const schema_1 = require("../../schema");
const createIntersectionSchema = (zodIntersection, state) => ({
    allOf: [
        (0, schema_1.createSchemaObject)(zodIntersection._def.left, state, [
            'intersection left',
        ]),
        (0, schema_1.createSchemaObject)(zodIntersection._def.right, state, [
            'intersection right',
        ]),
    ],
});
exports.createIntersectionSchema = createIntersectionSchema;
//# sourceMappingURL=intersection.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIntersectionSchema = void 0;
const _1 = require(".");
const createIntersectionSchema = (zodIntersection, state) => ({
    allOf: [
        (0, _1.createSchemaOrRef)(zodIntersection._def.left, state, [
            'intersection left',
        ]),
        (0, _1.createSchemaOrRef)(zodIntersection._def.right, state, [
            'intersection right',
        ]),
    ],
});
exports.createIntersectionSchema = createIntersectionSchema;
//# sourceMappingURL=intersection.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTupleSchema = void 0;
const openapi_1 = require("../../openapi");
const _1 = require(".");
const createTupleSchema = (zodTuple, state) => {
    const items = zodTuple.items;
    const rest = zodTuple._def.rest;
    return {
        type: 'array',
        ...mapItemProperties(items, rest, state),
    };
};
exports.createTupleSchema = createTupleSchema;
const mapPrefixItems = (items, state) => {
    if (items.length) {
        return items.map((item, index) => (0, _1.createSchemaOrRef)(item, state, [`tuple item ${index}`]));
    }
    return undefined;
};
const mapItemProperties = (items, rest, state) => {
    const prefixItems = mapPrefixItems(items, state);
    if ((0, openapi_1.satisfiesVersion)(state.components.openapi, '3.1.0')) {
        if (!rest) {
            return {
                maxItems: items.length,
                minItems: items.length,
                ...(prefixItems && { prefixItems }),
            };
        }
        return {
            items: (0, _1.createSchemaOrRef)(rest, state, ['tuple items']),
            ...(prefixItems && { prefixItems }),
        };
    }
    if (!rest) {
        return {
            maxItems: items.length,
            minItems: items.length,
            ...(prefixItems && { items: { oneOf: prefixItems } }),
        };
    }
    return {
        ...(prefixItems && {
            items: {
                oneOf: [
                    ...prefixItems,
                    (0, _1.createSchemaOrRef)(rest, state, ['tuple items']),
                ],
            },
        }),
    };
};
//# sourceMappingURL=tuple.js.map
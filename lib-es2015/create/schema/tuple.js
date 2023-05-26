import { satisfiesVersion } from '../../openapi';
import { createSchemaOrRef } from '.';
export const createTupleSchema = (zodTuple, state) => {
    const items = zodTuple.items;
    const rest = zodTuple._def.rest;
    return {
        type: 'array',
        ...mapItemProperties(items, rest, state),
    };
};
const mapPrefixItems = (items, state) => {
    if (items.length) {
        return items.map((item, index) => createSchemaOrRef(item, state, [`tuple item ${index}`]));
    }
    return undefined;
};
const mapItemProperties = (items, rest, state) => {
    const prefixItems = mapPrefixItems(items, state);
    if (satisfiesVersion(state.components.openapi, '3.1.0')) {
        if (!rest) {
            return {
                maxItems: items.length,
                minItems: items.length,
                ...(prefixItems && { prefixItems }),
            };
        }
        return {
            items: createSchemaOrRef(rest, state, ['tuple items']),
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
                    createSchemaOrRef(rest, state, ['tuple items']),
                ],
            },
        }),
    };
};
//# sourceMappingURL=tuple.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortStringsAndNumbers = exports.getValidEnumValues = exports.createNativeEnumSchema = void 0;
const openapi_1 = require("../../openapi");
const createNativeEnumSchema = (zodEnum, state) => {
    const enumValues = (0, exports.getValidEnumValues)(zodEnum._def.values);
    const { numbers, strings } = (0, exports.sortStringsAndNumbers)(enumValues);
    if (strings.length && numbers.length) {
        if ((0, openapi_1.satisfiesVersion)(state.components.openapi, '3.1.0'))
            return {
                type: ['string', 'number'],
                enum: [...strings, ...numbers],
            };
        return {
            oneOf: [
                { type: 'string', enum: strings },
                { type: 'number', enum: numbers },
            ],
        };
    }
    if (strings.length) {
        return {
            type: 'string',
            enum: strings,
        };
    }
    return {
        type: 'number',
        enum: numbers,
    };
};
exports.createNativeEnumSchema = createNativeEnumSchema;
const getValidEnumValues = (enumValues) => {
    const keys = Object.keys(enumValues).filter((key) => typeof enumValues[enumValues[key]] !== 'number');
    return keys.map((key) => enumValues[key]);
};
exports.getValidEnumValues = getValidEnumValues;
const sortStringsAndNumbers = (values) => ({
    strings: values.filter((value) => typeof value === 'string'),
    numbers: values.filter((value) => typeof value === 'number'),
});
exports.sortStringsAndNumbers = sortStringsAndNumbers;
//# sourceMappingURL=nativeEnum.js.map
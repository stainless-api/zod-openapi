import { satisfiesVersion } from '../../openapi';
export const createNativeEnumSchema = (zodEnum, state) => {
    const enumValues = getValidEnumValues(zodEnum._def.values);
    const { numbers, strings } = sortStringsAndNumbers(enumValues);
    if (strings.length && numbers.length) {
        if (satisfiesVersion(state.components.openapi, '3.1.0'))
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
export const getValidEnumValues = (enumValues) => {
    const keys = Object.keys(enumValues).filter((key) => typeof enumValues[enumValues[key]] !== 'number');
    return keys.map((key) => enumValues[key]);
};
export const sortStringsAndNumbers = (values) => ({
    strings: values.filter((value) => typeof value === 'string'),
    numbers: values.filter((value) => typeof value === 'number'),
});
//# sourceMappingURL=nativeEnum.js.map
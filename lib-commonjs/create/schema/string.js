"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStringSchema = void 0;
const createStringSchema = (zodString) => {
    const zodStringChecks = getZodStringChecks(zodString);
    const format = mapStringFormat(zodStringChecks);
    const pattern = mapRegex(zodStringChecks);
    const minLength = zodStringChecks.length?.value ?? zodStringChecks.min?.value;
    const maxLength = zodStringChecks.length?.value ?? zodStringChecks.max?.value;
    return {
        type: 'string',
        ...(format && { format }),
        ...(pattern && { pattern }),
        ...(minLength !== undefined && { minLength }),
        ...(maxLength !== undefined && { maxLength }),
    };
};
exports.createStringSchema = createStringSchema;
const getZodStringChecks = (zodString) => zodString._def.checks.reduce((acc, check) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    acc[check.kind] = check;
    return acc;
}, {});
const mapRegex = (zodStringChecks) => {
    const regexCheck = zodStringChecks.regex;
    if (!regexCheck) {
        return undefined;
    }
    return regexCheck?.regex.source;
};
const mapStringFormat = (zodStringChecks) => {
    if (zodStringChecks.uuid) {
        return 'uuid';
    }
    if (zodStringChecks.datetime) {
        return 'date-time';
    }
    if (zodStringChecks.email) {
        return 'email';
    }
    if (zodStringChecks.url) {
        return 'uri';
    }
    return undefined;
};
//# sourceMappingURL=string.js.map
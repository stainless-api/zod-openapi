"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapMinimum = exports.mapMaximum = exports.mapNumberChecks = exports.createNumberSchema = void 0;
const openapi_1 = require("../../openapi");
const createNumberSchema = (zodNumber, state) => {
    const zodNumberChecks = getZodNumberChecks(zodNumber);
    const minimum = (0, exports.mapMinimum)(zodNumberChecks, state.components.openapi);
    const maximum = (0, exports.mapMaximum)(zodNumberChecks, state.components.openapi);
    return {
        type: mapNumberType(zodNumberChecks),
        ...(minimum && minimum),
        ...(maximum && maximum),
    };
};
exports.createNumberSchema = createNumberSchema;
const mapNumberChecks = () => { };
exports.mapNumberChecks = mapNumberChecks;
const mapMaximum = (zodNumberCheck, openapi) => {
    if (!zodNumberCheck.max) {
        return undefined;
    }
    const maximum = zodNumberCheck.max.value;
    if (zodNumberCheck.max.inclusive) {
        return { ...(maximum !== undefined && { maximum }) };
    }
    if ((0, openapi_1.satisfiesVersion)(openapi, '3.1.0')) {
        return { exclusiveMaximum: maximum };
    }
    return { maximum, exclusiveMaximum: true };
};
exports.mapMaximum = mapMaximum;
const mapMinimum = (zodNumberCheck, openapi) => {
    if (!zodNumberCheck.min) {
        return undefined;
    }
    const minimum = zodNumberCheck.min.value;
    if (zodNumberCheck.min.inclusive) {
        return { ...(minimum !== undefined && { minimum }) };
    }
    if ((0, openapi_1.satisfiesVersion)(openapi, '3.1.0')) {
        return { exclusiveMinimum: minimum };
    }
    return { minimum, exclusiveMinimum: true };
};
exports.mapMinimum = mapMinimum;
const getZodNumberChecks = (zodNumber) => zodNumber._def.checks.reduce((acc, check) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    acc[check.kind] = check;
    return acc;
}, {});
const mapNumberType = (zodNumberChecks) => (zodNumberChecks.int ? 'integer' : 'number');
//# sourceMappingURL=number.js.map
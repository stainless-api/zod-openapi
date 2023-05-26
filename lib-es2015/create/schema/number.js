import { satisfiesVersion } from '../../openapi';
export const createNumberSchema = (zodNumber, state) => {
    const zodNumberChecks = getZodNumberChecks(zodNumber);
    const minimum = mapMinimum(zodNumberChecks, state.components.openapi);
    const maximum = mapMaximum(zodNumberChecks, state.components.openapi);
    return {
        type: mapNumberType(zodNumberChecks),
        ...(minimum && minimum),
        ...(maximum && maximum),
    };
};
export const mapNumberChecks = () => { };
export const mapMaximum = (zodNumberCheck, openapi) => {
    if (!zodNumberCheck.max) {
        return undefined;
    }
    const maximum = zodNumberCheck.max.value;
    if (zodNumberCheck.max.inclusive) {
        return { ...(maximum !== undefined && { maximum }) };
    }
    if (satisfiesVersion(openapi, '3.1.0')) {
        return { exclusiveMaximum: maximum };
    }
    return { maximum, exclusiveMaximum: true };
};
export const mapMinimum = (zodNumberCheck, openapi) => {
    if (!zodNumberCheck.min) {
        return undefined;
    }
    const minimum = zodNumberCheck.min.value;
    if (zodNumberCheck.min.inclusive) {
        return { ...(minimum !== undefined && { minimum }) };
    }
    if (satisfiesVersion(openapi, '3.1.0')) {
        return { exclusiveMinimum: minimum };
    }
    return { minimum, exclusiveMinimum: true };
};
const getZodNumberChecks = (zodNumber) => zodNumber._def.checks.reduce((acc, check) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    acc[check.kind] = check;
    return acc;
}, {});
const mapNumberType = (zodNumberChecks) => (zodNumberChecks.int ? 'integer' : 'number');
//# sourceMappingURL=number.js.map
export function extendZodWithOpenApi(zod) {
    if (typeof zod.ZodType.prototype.openapi !== 'undefined') {
        return;
    }
    zod.ZodType.prototype.openapi = function (openapi) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        const result = new this.constructor({
            ...this._def,
            openapi,
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return result;
    };
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const zodObjectExtend = zod.ZodObject.prototype.extend;
    zod.ZodObject.prototype.extend = function (...args) {
        const extendResult = zodObjectExtend.apply(this, args);
        extendResult._def.extendMetadata = {
            extends: this,
        };
        delete extendResult._def.openapi;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return extendResult;
    };
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const zodObjectOmit = zod.ZodObject.prototype.omit;
    zod.ZodObject.prototype.omit = function (...args) {
        const omitResult = zodObjectOmit.apply(this, args);
        delete omitResult._def.extendMetadata;
        delete omitResult._def.openapi;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return omitResult;
    };
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const zodObjectPick = zod.ZodObject.prototype.pick;
    zod.ZodObject.prototype.pick = function (...args) {
        const pickResult = zodObjectPick.apply(this, args);
        delete pickResult._def.extendMetadata;
        delete pickResult._def.openapi;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return pickResult;
    };
}
//# sourceMappingURL=extendZod.js.map
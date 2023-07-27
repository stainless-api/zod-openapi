"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.satisfiesVersion = exports.openApiVersions = void 0;
exports.openApiVersions = [
    '3.0.0',
    '3.0.1',
    '3.0.2',
    '3.0.3',
    '3.1.0',
];
const satisfiesVersion = (test, against) => exports.openApiVersions.indexOf(test) >= exports.openApiVersions.indexOf(against);
exports.satisfiesVersion = satisfiesVersion;
//# sourceMappingURL=openapi.js.map
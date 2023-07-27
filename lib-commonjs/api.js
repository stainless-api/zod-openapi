"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParamOrRef = exports.createMediaTypeSchema = exports.getDefaultComponents = exports.createComponents = void 0;
var components_1 = require("./create/components");
Object.defineProperty(exports, "createComponents", { enumerable: true, get: function () { return components_1.createComponents; } });
Object.defineProperty(exports, "getDefaultComponents", { enumerable: true, get: function () { return components_1.getDefaultComponents; } });
var content_1 = require("./create/content");
Object.defineProperty(exports, "createMediaTypeSchema", { enumerable: true, get: function () { return content_1.createMediaTypeSchema; } });
var parameters_1 = require("./create/parameters");
Object.defineProperty(exports, "createParamOrRef", { enumerable: true, get: function () { return parameters_1.createParamOrRef; } });
//# sourceMappingURL=api.js.map
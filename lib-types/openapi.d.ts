export declare const openApiVersions: readonly ["3.0.0", "3.0.1", "3.0.2", "3.0.3", "3.1.0"];
export type OpenApiVersion = (typeof openApiVersions)[number];
export declare const satisfiesVersion: (test: OpenApiVersion, against: OpenApiVersion) => boolean;

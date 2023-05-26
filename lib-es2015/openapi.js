export const openApiVersions = [
    '3.0.0',
    '3.0.1',
    '3.0.2',
    '3.0.3',
    '3.1.0',
];
export const satisfiesVersion = (test, against) => openApiVersions.indexOf(test) >= openApiVersions.indexOf(against);
//# sourceMappingURL=openapi.js.map
module.exports = {
    moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
    transform: {
        '.*\\.(vue)$': 'vue-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    testURL: 'http://localhost/',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,ts,vue}'],
    moduleNameMapper: {
        '^@assets/(.*)$': '<rootDir>/assets/$1',
        '^@cells/(.*)$': '<rootDir>/src/cells/$1',
        '^@contents/(.*)$': '<rootDir>/src/contents/$1',
        '^@effects/(.*)$': '<rootDir>/src/effects/$1',
        '^@levels/(.*)$': '<rootDir>/src/levels/$1',
        '^@model/(.*)$': '<rootDir>/src/model/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
    },
};

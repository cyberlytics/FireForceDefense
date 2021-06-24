module.exports = {
    moduleFileExtensions: ['js', 'ts', 'json'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    collectCoverageFrom: ['src/**/*.{js,ts}'],
    testEnvironment: 'node',
    collectCoverage: true,
    preset: '@shelf/jest-mongodb',
};

module.exports = {
    globals: {
        fetch: global.fetch,
        Response: global.Response,
        Request: global.Request
    },
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    moduleNameMapper: {
        '^@project/(.*)$': '<rootDir>/src/$1'
    }
};

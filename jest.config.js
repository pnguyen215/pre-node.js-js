module.exports = {
    transform: {
        '^.+\\.js?$': 'ts-jest'
    },
    testEnvironment: 'node',
    testRegex: './src/.*\\.(test|spec)?\\.(js|js)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    "roots": [
        "<rootDir>/src"
    ]
};
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import path from 'path';

export default {
	// The glob patterns Jest uses to detect test files
	testMatch: [
		// '**/__tests__/**/*.[jt]s?(x)',
		// '**/?(*.)+(spec|test).[tj]s?(x)',
		'<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)',
	],

	// A set of global variables that need to be available in all test environments
	globals: {
		_IS_DEV: true,
		_API: '',
		_PROJECT: 'jest',
	},

	modulePaths: [
		'<rootDir>src', // правило абсолютных путей для импорта // https://stackoverflow.com/questions/50863312/jest-gives-cannot-find-module-when-importing-components-with-absolute-paths
	],

	setupFilesAfterEnv: ['<rootDir>config/jest/jest-setup.ts'], // правило для работы библиотеки jest-dom // https://github.com/testing-library/jest-dom

	moduleNameMapper: {
		// '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
		// '<rootDir>/__mocks__/fileMock.js',
		'\\.s?css$': 'identity-obj-proxy',
		'\\.svg': path.resolve(__dirname, 'jest-component.tsx'),
		// '^@/(.*)$': '<rootDir>src/$1', // для алиасов
	}, // импорты

	// The root directory that Jest should scan for tests and modules within
	rootDir: '../../',

	// https://www.npmjs.com/package/jest-html-reporters
	reporters: [
		'default',
		[
			'jest-html-reporters',
			{
				publicPath: '<rootDir>/reports/unit',
				filename: 'report.html',
				openReport: true,
				inlineSource: true,
			},
		],
	],

	// Automatically clear mock calls, instances, contexts and results before every test
	clearMocks: true,

	// The test environment that will be used for testing
	testEnvironment: 'jsdom',

	// An array of directory names to be searched recursively up from the requiring module's location
	moduleDirectories: ['node_modules'],

	// An array of regexp pattern strings used to skip coverage collection
	coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],

	// An array of file extensions your modules use
	moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],
};

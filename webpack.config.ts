// npx webpack | webpack  if(-g)
// import path from 'path'; // для пакетов ноды  * as | изменить конфиг TS [esModuleInterop, allowSyntheticDefaultImports]
import path from 'path';
import type webpack from 'webpack';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { type BuildEnv, type BuildPaths } from './config/build/types/config';

export default (env: BuildEnv) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'), // точка входа
		build: path.resolve(__dirname, 'build'), // папка сборки
		html: path.resolve(__dirname, 'public', 'index.html'), // html
		src: path.resolve(__dirname, 'src'), // src
	};

	// webpack serve --env port=3000
	const mode = env?.mode || 'development'; // режим сборки
	const PORT = env?.port || 3000; // front port
	const isDev = mode === 'development'; // true or false

	// Основная конфигурация webpack
	const config: webpack.Configuration = buildWebpackConfig({
		mode,
		paths,
		isDev,
		port: PORT,
		project: 'frontend',
	});

	return config;
};

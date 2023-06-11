import { type BuildOptions } from './types/config';

import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

import type webpack from 'webpack';

export function buildWebpackConfig (options: BuildOptions): webpack.Configuration {
	const { mode, paths, isDev } = options;

	return { // TS type from webpack
		module: { // TS // Обработка расширений файлов выходящие за рамки JS
			rules: buildLoaders(options),
		},
		resolve: buildResolvers(options), // TS расширения импортируемых компонентов (снимает обязанность писать расширения при импортах)

		devServer: buildDevServer(options),

		// Почитать тут: https://webpack.js.org/configuration/devtool/
		devtool: isDev ? 'eval-cheap-module-source-map' : undefined, // карта исходного кода / упрощает поиск ошибок возникшие в одном из файлов

		mode, // development | production
		entry: { // входная точка приложения
			bundle: paths.entry,
		},
		output: { // куда собрать приложение
			filename: '[name].[contenthash].js', // шаблон динамического имени entry[key=name=bundle].[random_hash]
			path: paths.build,
			clean: true, // подчищает папку build
			publicPath: '/', // базовый путь // https://webpack.js.org/guides/public-path/
		},
		plugins: buildPlugins(options),
	};
};

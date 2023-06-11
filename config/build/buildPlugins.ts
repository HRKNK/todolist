import { type BuildOptions } from './types/config';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export function buildPlugins ({ paths, isDev, project }: BuildOptions): webpack.WebpackPluginInstance[] { // специальный TS тип для плагинов
	const plugins = [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({ template: paths.html }), // файл используется как шаблон (куда подключать сборку/файлы)
		new webpack.DefinePlugin({ // переменные окружения
			_IS_DEV: JSON.stringify(isDev),
			_PROJECT: JSON.stringify(project),
		}),
	];

	// Оптимизация сборки:

	if (isDev) { // докинуть плагины в дэв сборку
		plugins.push(new webpack.HotModuleReplacementPlugin()); // апдейты изменений без перезагрузок страницы
		plugins.push(new ReactRefreshWebpackPlugin( { overlay: false } )); // апдейты для реакт компонентов (overlay - наложение ошибки)
		plugins.push(new BundleAnalyzerPlugin({
			openAnalyzer: false, // открытие вкладки статистики (ссылка дублируется в консоль)
		}));
	}

	if (!isDev) { // докинуть плагины в прод сборку
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css',
			}),
		);
	}

	return plugins;
}

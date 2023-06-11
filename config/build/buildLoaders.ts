/* eslint-disable @typescript-eslint/naming-convention */
import type webpack from 'webpack';
import { type BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
	// специальный TS тип для лоадеров|правил

	const typescriptLoaders = {
		test: /\.tsx?$/,
		loader: 'ts-loader',
		exclude: /node_modules/, // исключение
	};

	const scssLoader = {
		exclude: /node_modules/, // исключение
		test: /\.s[ac]ss$/i,
		use: [
			// Creates `style` nodes from JS strings
			options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // OR "style-loader",
			// Translates CSS into CommonJS
			{
				loader: 'css-loader',
				options: {
					// modules: true, // поддержка модулей ('./counter.module.scss') and use (global.d.ts)
					modules: {
						auto: /\.module\.s[ac]ss$/i, // для каких файлов действует правило module
						localIdentName: options.isDev ? 'css/[path][name]__[local]--[hash:base64:5]' : '[hash:base64:5]', // генерация имени стилей
					},
				},
			},
			// Compiles Sass to CSS
			'sass-loader',
		],
	};

	const svgLoader = {
		exclude: /node_modules/, // исключение
		test: /\.svg$/,
		// use: ['@svgr/webpack'],
		use: [
			{
				loader: '@svgr/webpack',
				options: {
					// Конфиг лоадера: https://react-svgr.com/docs/options
					icon: true, // Ресайз SVG = Удаляет из SVG размеры
					svgoConfig: {
						// Реколор SVG = Удаляет из SVG fill
						plugins: [
							{
								name: 'convertColors',
								params: {
									currentColor: true,
								},
							},
						],
					},
				},
			},
		],
	};

	const fileLoader = {
		exclude: /node_modules/, // исключение
		test: /\.(png|jpe?g|gif)$/i, // можно докинуть свои расширения типа шрифтов
		use: [
			{
				loader: 'file-loader',
			},
		],
	};

	return [fileLoader, svgLoader, typescriptLoaders, scssLoader]; // создание порядка возвращаемых лоадеров (выполняются в обратном порядке?) // https://webpack.js.org/concepts/loaders/
}

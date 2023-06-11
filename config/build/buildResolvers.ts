import { type BuildOptions } from './types/config';
import { type ResolveOptions } from 'webpack';

export function buildResolvers (options: BuildOptions): ResolveOptions { // TS типизация проекта
	return {
		extensions: ['.ts', '.tsx', '.js', '.jsx'], // TS расширения импортируемых компонентов (снимает обязанность писать расширения при импортах)
		preferAbsolute: true, // использование абсолютных путей
		modules: [options.paths.src, 'node_modules'],
		mainFiles: ['index'],
		alias: {
			// '@': options.paths.src, // + изменить корень в ts.config
		},
	};
}

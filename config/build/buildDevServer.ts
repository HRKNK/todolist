import { type BuildOptions } from './types/config';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'; // пересечение с сonfiguration из webpack

export function buildDevServer (options: BuildOptions): DevServerConfiguration {
	return {
		port: options.port,
		open: true, // открытие в вэб браузере // --open для npm
		historyApiFallback: true, // проксирование через index.page (корневая страница)
		hot: true,
	};
};

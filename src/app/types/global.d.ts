// Глобальная декларация типов

declare module '*.scss' {
	type IClassNames = Record<string, string>;
	const classNames: IClassNames;
	export = classNames;
}

declare module 'react-custom-checkbox';

// https://github.com/gregberge/svgr/issues/546
declare module '*.svg' {
	import type React from 'react';
	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare const _IS_DEV: boolean;
declare const _API: string;
declare const _PROJECT: 'frontend' | 'jest';

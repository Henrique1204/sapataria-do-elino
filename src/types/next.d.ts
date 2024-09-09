import React from 'react';

declare global {
	type NextPage<Params = {}> = (props: {
		params: Params;
	}) => React.ReactNode | Promise<React.ReactNode>;

	export type PageProps = {
		Home: NextPage;
		Cms: NextPage;
	};

	export type PagesName = keyof PageProps;

	export type Page<_PageName extends PagesName> = PageProps[_PageName];
}

export {};

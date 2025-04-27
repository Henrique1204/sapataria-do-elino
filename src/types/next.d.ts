import React from 'react';

declare global {
	type NextPage<Params = {}> = (props: {
		params: Params;
	}) => React.ReactNode | Promise<React.ReactNode>;

	export type PageProps = {
		Home: NextPage;
		Login: NextPage;
		ForgotPassword: NextPage;
		ValidateAccount: NextPage;
		ValidateUserEmail: NextPage;
		RegisterNewPassword: NextPage;
		ActiveAccountByLink: NextPage<{
			token: string;
		}>;
		CMS: NextPage;
	};

	export type PagesName = keyof PageProps;

	export type Page<_PageName extends PagesName> = PageProps[_PageName];

	export type ActionReturn<T = {}> = {
		code: number;
		message?: string;
		data?: T;
		success: boolean;
	};
}

export {};

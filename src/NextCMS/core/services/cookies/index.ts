'use server';

import { cookies } from 'next/headers';

import { getHoursInSeconds } from 'NextCMS/core/utils/time';

const COOKIE_KEY_PREFIX = 'sapataria_elino:nextcms';

export type CookieKey = 'token' | 'email';

export const getCookie = async (
	cookieKey: CookieKey
): Promise<string | undefined> => {
	return new Promise((res) => {
		const cookieValue = cookies().get(
			`${COOKIE_KEY_PREFIX}:${cookieKey}`
		)?.value;

		return res(cookieValue);
	});
};

export const setCookie = (
	cookieKey: CookieKey,
	value: string,
	option?: {
		timeToExpireInHour?: number;
	}
): void => {
	try {
		const DEFAULT_TIME_TO_EXPIRE_COOKIE_IN_HOUR = 2;

		cookies().set(`${COOKIE_KEY_PREFIX}:${cookieKey}`, value, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: getHoursInSeconds(
				option?.timeToExpireInHour || DEFAULT_TIME_TO_EXPIRE_COOKIE_IN_HOUR
			),
		});
	} catch (_) {
		throw new Error('Não foi possível guardar o cookie.');
	}
};

export const deleteCookie = (cookieKey: CookieKey): void => {
	try {
		cookies().delete(`${COOKIE_KEY_PREFIX}:${cookieKey}`);
	} catch (_) {
		throw new Error('Não foi possível deletar o cookie.');
	}
};

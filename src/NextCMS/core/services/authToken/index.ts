'use server';

import jwt from 'jsonwebtoken';

import { getCookie, setCookie } from 'NextCMS/core/services/cookies';

import { IUser } from 'NextCMS/database/models/User';

const TIME_TO_EXPIRE_TOKEN_IN_HOUR = 24;

export const validateToken = async (token?: string): Promise<boolean> => {
	try {
		const cookieToken = await getCookie('token');

		const _token = token || cookieToken;

		const secretKey = process.env.NEXT_JWT_SECRET;
		jwt.verify(_token!, secretKey!);

		return true;
	} catch (error) {
		return false;
	}
};

export const generateToken = ({
	_id,
	email,
	isActived,
	role,
}: IUser): string | void => {
	try {
		const token = jwt.sign(
			{
				userId: _id,
				email,
				isActived,
				role,
			},
			process.env.NEXT_JWT_SECRET!,
			{ expiresIn: `${TIME_TO_EXPIRE_TOKEN_IN_HOUR}h` }
		);

		return token;
	} catch (_) {
		throw new Error('Não foi possível gerar o token.');
	}
};

export const saveToken = (token: string): void => {
	try {
		setCookie('token', token, {
			timeToExpireInHour: TIME_TO_EXPIRE_TOKEN_IN_HOUR,
		});
	} catch (_) {
		throw new Error('Não foi possível gerar o token.');
	}
};

export const getInfosFromTokenInCookies = async () => {
	try {
		const token = await getCookie('token');

		const decoded = jwt.verify(token!, process.env.NEXT_JWT_SECRET!) as Omit<
			IUser,
			'password'
		>;

		return decoded;
	} catch (_) {
		throw new Error('Não foi possível recuperar o token.');
	}
};

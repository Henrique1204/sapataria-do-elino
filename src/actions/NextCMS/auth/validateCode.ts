'use server';

import APIException from 'NextCMS/core/exepctions/api';

import { getCookie } from 'NextCMS/core/services/cookies';

import { validateAuthCodeByEmail } from 'NextCMS/core/services/validateAuthCode';

const validateCode = async (code: string): Promise<ActionReturn> => {
	try {
		const email = await getCookie('email');

		await validateAuthCodeByEmail({ code, email: email! });

		return {
			success: true,
			code: 200,
		};
	} catch (error) {
		console.error(error);

		return {
			success: false,
			message:
				error instanceof APIException
					? error.message
					: 'Erro ao realizar ação.',
			code: error instanceof APIException ? error.code : 500,
		};
	}
};

export default validateCode;

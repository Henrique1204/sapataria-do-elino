'use server';

import { z } from 'zod';

import APIException from 'NextCMS/core/exepctions/api';

import { sendAuthCodeEmail } from 'NextCMS/core/services/authCodeService';
import { getCookie } from 'NextCMS/core/services/cookies';

const emailSchema = z.string().email().trim().toLowerCase();

const sendCode = async (emailEntry?: string): Promise<ActionReturn<void>> => {
	try {
		const email = emailEntry || (await getCookie('email'));

		const parsed = emailSchema.safeParse(email);

		if (!parsed.success) throw new APIException('Dados inválidos', 400);

		const emailParsed = parsed.data;

		await sendAuthCodeEmail(emailParsed);

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

export default sendCode;

'use server';

import { updateUserAccountStatusToActiveByEmail } from 'NextCMS/database/repository/user';

import APIException from 'NextCMS/core/exepctions/api';

import { getCookie } from 'NextCMS/core/services/cookies';
import { validateAuthCodeByEmail } from 'NextCMS/core/services/validateAuthCode';

import { emailSchema } from 'NextCMS/core/utils/validations/schemas/userSchemas';

const validateActivationCode = async (code: string): Promise<ActionReturn> => {
	try {
		const email = await getCookie('email');
		const emailParse = emailSchema.safeParse(email);

		if (!emailParse.success) {
			throw new APIException('Dados inválidos', 400);
		}

		const emailParsed = emailParse.data!;

		await validateAuthCodeByEmail({ code, email: emailParsed });

		await updateUserAccountStatusToActiveByEmail(emailParsed);

		return { success: true, code: 200 };
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

export default validateActivationCode;

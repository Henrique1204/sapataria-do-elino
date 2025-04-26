'use server';

import APIException from 'NextCMS/core/exepctions/api';

import { sendAuthCodeEmail } from 'NextCMS/core/services/authCodeService';
import { setCookie } from 'NextCMS/core/services/cookies';
import { getActiveUserByEmail } from 'NextCMS/core/services/userService';

import { emailSchema } from 'NextCMS/core/utils/validations/schemas/userSchemas';

const sendCodeToResetPassword = async (
	email: string
): Promise<ActionReturn<void>> => {
	try {
		const parsed = emailSchema.safeParse(email);

		if (!parsed.success) throw new APIException('Dados inválidos', 400);

		const emailParsed = parsed.data;

		const user = await getActiveUserByEmail(emailParsed);

		await sendAuthCodeEmail(user.email);

		setCookie('email', user.email, { timeToExpireInHour: 1 });

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

export default sendCodeToResetPassword;

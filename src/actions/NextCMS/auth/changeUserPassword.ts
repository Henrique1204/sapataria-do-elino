'use server';

import APIException from 'NextCMS/core/exepctions/api';

import { changeUserPasswordByEmail } from 'NextCMS/database/repository/user';

import { getCookie } from 'NextCMS/core/services/cookies';
import { getActiveUserByEmail } from 'NextCMS/core/services/userService';

import { changeUserPasswordSchema } from 'NextCMS/core/utils/validations/schemas/changeUserPassword';

const changeUserPassword = async ({
	newPassword,
	confirmPassword,
}: {
	newPassword: string;
	confirmPassword: string;
}): Promise<ActionReturn<void>> => {
	try {
		const parsed = changeUserPasswordSchema.safeParse({
			newPassword,
			confirmPassword,
		});

		if (!parsed.success) {
			throw new APIException(parsed.error.errors[0]?.message, 400);
		}

		const userEmail = await getCookie('email');

		if (!userEmail) {
			throw new APIException('O e-mail do usuário não foi definido', 307);
		}

		await getActiveUserByEmail(userEmail);

		await changeUserPasswordByEmail({
			email: userEmail,
			newPassword: parsed.data.newPassword,
		});

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

export default changeUserPassword;

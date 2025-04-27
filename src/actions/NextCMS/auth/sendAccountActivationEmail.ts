'use server';

import APIException from 'NextCMS/core/exepctions/api';

import { emailSchema } from 'NextCMS/core/utils/validations/schemas/userSchemas';

import { sendActivationEmail } from 'NextCMS/core/services/accountActivationService';
import { getActiveUserByEmail } from 'NextCMS/core/services/userService';
import { getUserByEmail } from 'NextCMS/database/repository/user';

const sendAccountActivationEmail = async (
	email: string
): Promise<ActionReturn> => {
	try {
		const parsed = emailSchema.safeParse(email);

		if (!parsed.success) throw new APIException('E-mail inválido', 400);

		const user = await getUserByEmail(email);

		if (!user) throw new APIException('Usuário não encontrado.', 404);

		await sendActivationEmail(user);

		return { success: true, code: 200 };
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message:
				error instanceof APIException
					? error.message
					: 'Erro ao enviar e-mail.',
			code: error instanceof APIException ? error.code : 500,
		};
	}
};

export default sendAccountActivationEmail;

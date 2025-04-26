'use server';

import APIException from 'NextCMS/core/exepctions/api';

import { getCookie } from 'NextCMS/core/services/cookies';

import {
	getUserByEmail,
	updateUserAccountStatusToActiveByEmail,
} from 'NextCMS/database/repository/user';

import { emailSchema } from 'NextCMS/core/utils/validations/schemas/userSchemas';

import { codeSchema } from 'NextCMS/core/utils/validations/schemas/userCodeSchemas';

import {
	deleteUserCodeByUserId,
	getUserCodeByUserId,
} from 'NextCMS/database/repository/userCode';

const validateCode = async (code: string): Promise<ActionReturn> => {
	try {
		const codeParse = codeSchema.safeParse(code);

		const email = await getCookie('email');
		const emailParse = emailSchema.safeParse(email);

		if (!codeParse.success || !emailParse.success) {
			throw new APIException('Dados inválidos', 400);
		}

		const codeParsed = codeParse.data;
		const emailParsed = emailParse.data;

		const user = await getUserByEmail(emailParsed);

		const userCode = await getUserCodeByUserId(user._id);

		if (!user || !userCode) {
			throw new APIException(
				'Código de autenticação inválido ou expirado.',
				400
			);
		}

		if (userCode.code !== codeParsed) {
			throw new APIException('Código de autenticação incorreto.', 400);
		}

		if (Date.now() > userCode.expirationDate.getTime()) {
			await deleteUserCodeByUserId(user._id);

			throw new APIException('Código de autenticação expirado.', 400);
		}

		await deleteUserCodeByUserId(user._id);
		await updateUserAccountStatusToActiveByEmail(emailParsed);

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

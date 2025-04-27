import { getUserByEmail } from '../../../database/repository/user';

import {
	deleteUserCodeByUserId,
	getUserCodeByUserId,
} from '../../../database/repository/userCode';

import APIException from '../../exepctions/api';

import { codeSchema } from '../../utils/validations/schemas/userCodeSchemas';
import { emailSchema } from '../../utils/validations/schemas/userSchemas';

export const validateAuthCodeByEmail = async ({
	code,
	email,
}: {
	code: string;
	email: string;
}) => {
	const codeParse = codeSchema.safeParse(code);
	const emailParse = emailSchema.safeParse(email);

	if (!codeParse.success || !emailParse.success) {
		throw new APIException('Dados inválidos', 400);
	}

	const codeParsed = codeParse.data;
	const emailParsed = emailParse.data;

	const user = await getUserByEmail(emailParsed);

	const userCode = await getUserCodeByUserId(user._id);

	if (!user || !userCode) {
		throw new APIException('Código de autenticação inválido ou expirado.', 400);
	}

	if (userCode.code !== codeParsed) {
		throw new APIException('Código de autenticação incorreto.', 400);
	}

	if (Date.now() > userCode.expirationDate.getTime()) {
		await deleteUserCodeByUserId(user._id);

		throw new APIException('Código de autenticação expirado.', 400);
	}

	await deleteUserCodeByUserId(user._id);
};

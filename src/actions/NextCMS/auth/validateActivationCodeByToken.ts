'use server';

import jwt from 'jsonwebtoken';

import APIException from 'NextCMS/core/exepctions/api';

import {
	getUserByEmail,
	updateUserAccountStatusToActiveByEmail,
} from 'NextCMS/database/repository/user';

type TokenPayload = {
	userId: string;
	email: string;
	iat: number;
	exp: number;
};

const validateActivationCodeByToken = async (
	token: string
): Promise<ActionReturn> => {
	try {
		const secret = process.env.NEXT_JWT_SECRET!;
		const payload = jwt.verify(token, secret) as TokenPayload;

		const user = await getUserByEmail(payload.email);

		if (!user) throw new APIException('Usuário não encontrado', 404);

		if (user._id.toString() !== payload.userId) {
			throw new APIException('Token inválido', 400);
		}

		if (user.isActived) throw new APIException('Conta já validada', 400);

		await updateUserAccountStatusToActiveByEmail(payload.email);

		return { success: true, code: 200 };
	} catch (error) {
		console.error(error);

		return {
			success: false,
			message:
				error instanceof APIException
					? error.message
					: 'Token inválido ou expirado.',
			code: error instanceof APIException ? error.code : 400,
		};
	}
};

export default validateActivationCodeByToken;

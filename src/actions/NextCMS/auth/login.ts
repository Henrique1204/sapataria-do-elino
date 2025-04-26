'use server';

import bcrypt from 'bcryptjs';

import { IUser } from 'NextCMS/database/models/User';

import APIException from 'NextCMS/core/exepctions/api';

import { getUserByEmail } from 'NextCMS/database/repository/user';

import { sendAuthCodeEmail } from 'NextCMS/core/services/authCodeService';
import { generateToken, saveToken } from 'NextCMS/core/services/authToken';
import { deleteCookie, setCookie } from 'NextCMS/core/services/cookies';

import { userCredentialsSchema } from 'NextCMS/core/utils/validations/schemas/userSchemas';

const Login = async (loginCredentials: {
	email: string;
	password: string;
}): Promise<ActionReturn<Pick<IUser, 'isActived'>> | void> => {
	try {
		// TODO: implementar a lógica de 401 dentro dos endpoints.
		const parsed = userCredentialsSchema.safeParse(loginCredentials);

		if (!parsed.success) throw new APIException('Dados inválidos', 400);

		const { email, password } = parsed.data;

		const user = await getUserByEmail(email);

		if (!user) throw new APIException('Credenciais inválidas', 401);

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) throw new APIException('Credenciais inválidas', 401);

		if (!user.isActived) {
			setCookie('email', user.email, { timeToExpireInHour: 1 });

			await sendAuthCodeEmail(user.email);

			return {
				success: true,
				code: 202,
				data: {
					isActived: false,
				},
			};
		}

		const token = generateToken(user)!;

		saveToken(token);
		deleteCookie('email');

		return {
			success: true,
			code: 200,
			data: {
				isActived: true,
			},
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

export default Login;

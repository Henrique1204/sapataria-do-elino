import jwt from 'jsonwebtoken';

import { IUser } from '../../../database/models/User';

import { sendEmail } from '../email';

const ACTIVATION_TOKEN_EXPIRY = '1h';

export const generateActivationToken = (user: IUser): string => {
	const secret = process.env.NEXT_JWT_SECRET!;

	return jwt.sign({ userId: user._id.toString(), email: user.email }, secret, {
		expiresIn: ACTIVATION_TOKEN_EXPIRY,
	});
};

export const sendActivationEmail = async (user: IUser) => {
	const token = generateActivationToken(user);
	const url = `${process.env.NEXT_PUBLIC_APP_URL}/auth/ativarConta?token=${token}`;
	const text = `
Olá,

Sua conta foi criada com o e-mail ${user.email}. Você poderá obter sua senha
com o administrador do site (${process.env.NEXT_APP_NAME}) ou validando diretamente através deste link:

${url}

*Atenção: este link expira em 1 hora.*
`;
	await sendEmail({
		to: user.email,
		subject: `[${process.env.NEXT_APP_NAME}] Ativação de conta`,
		text,
	});
};

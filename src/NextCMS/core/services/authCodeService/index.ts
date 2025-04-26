import { randomBytes } from 'crypto';

import { sendEmail } from '../email';
import { createUserCodeByUserEmail } from 'NextCMS/database/repository/userCode';

const CODE_LENGTH = 4;
const EXPIRATION_TIME = 5 * 60;

export const generateAuthCode = () => {
	const code = Array.from(
		{ length: CODE_LENGTH },
		() => randomBytes(1)[0] % 10
	).join('');

	return code;
};

export const sendAuthCodeEmail = async (userEmail: string) => {
	const code = generateAuthCode();
	const expirationDateInMiliseconds = Date.now() + EXPIRATION_TIME * 1000;

	await createUserCodeByUserEmail(userEmail, {
		code,
		expirationDate: new Date(expirationDateInMiliseconds),
	});

	await sendEmail({
		to: userEmail,
		subject: 'Seu código de autenticação',
		text: `Seu código de autenticação é: ${code}. Este código é válido por 5 minutos.`,
	});
};

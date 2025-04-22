import nodemailer from 'nodemailer';

import * as Types from './types';

export const sendEmail = async ({ subject, text, to }: Types.EmailInfos) => {
	const transporter = nodemailer.createTransport({
		service: process.env.EMAIL_SERVICE,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to,
		subject,
		text,
	};

	try {
		const info = await transporter.sendMail(mailOptions);

		console.log('Email enviado: ' + info.response);
	} catch (error) {
		console.error('Erro ao enviar email: ', error);

		throw new Error('Erro ao enviar email');
	}
};

'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import validateCode from 'actions/NextCMS/auth/validateCode';

import { Toaster } from '../../components';

import ValidateCodeForm from './ValidateCodeForm';

export const ValidateCodeInValidateAccountFlow: Component = () => {
	const router = useRouter();

	const handleSubmitCode = async (code: string) => {
		const { success, message } = await validateCode(code);

		if (!success) throw new Error(message);

		Toaster.open({
			message:
				'Usuário válidado, por favor confirme suas credenciais novamente.',
			position: 'topRight',
			status: 'success',
		});

		router.push('/auth/login');
	};

	return <ValidateCodeForm onSubmitCode={handleSubmitCode} />;
};

export const ValidateCodeInResetPassword: Component = () => {
	const router = useRouter();

	const handleSubmitCode = async (code: string) => {
		const { success, message } = await validateCode(code);

		if (!success) throw new Error(message);

		Toaster.open({
			message: 'Código validado com sucesso, por favor cadastre a nova senha.',
			position: 'topRight',
			status: 'success',
		});

		router.push('/auth/cadastrarNovaSenha');
	};

	return <ValidateCodeForm onSubmitCode={handleSubmitCode} />;
};

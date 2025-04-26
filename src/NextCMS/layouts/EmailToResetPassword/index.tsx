'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import sendCodeToResetPassword from 'actions/NextCMS/auth/sendCodeToResetPassword';

import { validateField, validations } from '../../core/utils/validations/ui';

import { Button, Input, Toaster } from '../../components';

const SECONDS_TO_HIDE_TOASTER = 4 * 1000;

const FORM_VALIDATIONS = {
	email: validateField(
		'O campo de e-mail é obrigatório',
		validations.common.isEmpty
	),
};

const EmailToResetPassword: Component = () => {
	const [email, setEmail] = React.useState<string>('');

	const [isSubmitingForm, setIsSubmitingForm] = React.useState<boolean>(false);

	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setIsSubmitingForm(true);

			const response = await sendCodeToResetPassword(email);

			if (!response) {
				throw new Error(
					'Não foi possível realizar a ação nesse momento, tente novamente mais tarde.'
				);
			}

			const { success, message } = response;

			if (!success) throw new Error(message);

			Toaster.open({
				message: `Código enviado para o e-mail ${email}.`,
				position: 'topRight',
				status: 'info',
			});

			router.push('/auth/validarEmail');
		} catch (e) {
			Toaster.open({
				message: (e as Error).message,
				position: 'topRight',
				status: 'error',
				timeout: SECONDS_TO_HIDE_TOASTER,
			});

			setIsSubmitingForm(false);
		}
	};

	const hasErrorInForm = validations.common.isEmpty(email);

	return (
		<form onSubmit={handleSubmit} className='w-full'>
			<Input
				label='E-mail'
				type='email'
				placeholder='email@email.com'
				value={email}
				onChangeText={setEmail}
				validateError={FORM_VALIDATIONS.email}
			/>

			<Button
				type='submit'
				isFullWidth
				disabled={isSubmitingForm || hasErrorInForm}
			>
				{isSubmitingForm ? 'Enviando...' : 'Enviar'}
			</Button>
		</form>
	);
};

export default EmailToResetPassword;

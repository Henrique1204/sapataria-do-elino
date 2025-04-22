'use client';

import React from 'react';

import LoginAction from 'actions/NextCMS/auth/login';

import {
	validateField,
	validateIsEmpty,
} from '../../core/utils/validations/form';

import { Button, Input, Toaster } from '../../components';

const FORM_VALIDATIONS = {
	email: validateField('O campo de e-mail é obrigatório', validateIsEmpty),
	password: validateField('O campo de senha é obrigatório', validateIsEmpty),
};

const TIME_TO_READ_MESSAGE = 1 * 1000;

const LoginForm: Component = () => {
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');

	const [isSubmitingForm, setIsSubmitingForm] = React.useState<boolean>(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setIsSubmitingForm(true);

			const response = await LoginAction({
				email,
				password,
			});

			if (!response) return;

			const { success, message } = response;

			if (!success) throw new Error(message);

			if (!response.data!.isActived) {
				Toaster.open({
					message: 'Por favor, valide seu e-mail antes de iniciar uma sessão.',
					position: 'topRight',
					status: 'info',
				});

				return setTimeout(() => {
					window.location.href = '/auth/validarCodigo';
				}, TIME_TO_READ_MESSAGE);
			}

			window.location.href = '/cms';
		} catch (e) {
			Toaster.open({
				message: (e as Error).message,
				position: 'topRight',
				status: 'error',
			});

			setIsSubmitingForm(false);
		}
	};

	const hasErrorInForm = validateIsEmpty(email) || validateIsEmpty(password);

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

			<Input
				label='Senha'
				type='password'
				placeholder='************'
				elementsClasses={{ container: 'mb-1' }}
				value={password}
				onChangeText={setPassword}
				validateError={FORM_VALIDATIONS.password}
			/>

			<Button type='button' variant='link' className='ml-auto mr-[-12px] mb-1'>
				Esqueci minha senha
			</Button>

			<Button
				type='submit'
				isFullWidth
				disabled={isSubmitingForm || hasErrorInForm}
			>
				{isSubmitingForm ? 'Enviando...' : 'Entrar'}
			</Button>
		</form>
	);
};

export default LoginForm;

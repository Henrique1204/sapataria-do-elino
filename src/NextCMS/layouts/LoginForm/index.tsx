'use client';

import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import LoginAction from 'actions/NextCMS/auth/login';

import { validateField, validations } from '../../core/utils/validations/ui';

import { Button, Input, Toaster } from '../../components';

const FORM_VALIDATIONS = {
	email: validateField(
		'O campo de e-mail é obrigatório',
		validations.common.isEmpty
	),
	password: validateField(
		'O campo de senha é obrigatório',
		validations.common.isEmpty
	),
};

const LoginForm: Component = () => {
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');

	const [isSubmitingForm, setIsSubmitingForm] = React.useState<boolean>(false);

	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setIsSubmitingForm(true);

			const response = await LoginAction({
				email,
				password,
			});

			if (!response) {
				throw new Error(
					'Não foi possível realizar a ação nesse momento, tente novamente mais tarde.'
				);
			}

			const { success, message } = response;

			if (!success) throw new Error(message);

			if (!response.data!.isActived) {
				Toaster.open({
					message: 'Por favor, valide seu e-mail antes de iniciar uma sessão.',
					position: 'topRight',
					status: 'info',
				});

				router.push('/auth/validarConta');

				return;
			}

			router.push('/cms');
		} catch (e) {
			Toaster.open({
				message: (e as Error).message,
				position: 'topRight',
				status: 'error',
			});

			setIsSubmitingForm(false);
		}
	};

	const hasErrorInForm =
		validations.common.isEmpty(email) || validations.common.isEmpty(password);

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

			<Link href='/auth/esqueciMinhaSenha'>
				<Button
					type='button'
					variant='link'
					className='ml-auto mr-[-12px] mb-1'
				>
					Esqueci minha senha
				</Button>
			</Link>

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

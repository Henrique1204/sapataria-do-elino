'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import changeUserPassword from 'actions/NextCMS/auth/changeUserPassword';

import {
	Types as ValidationsTypes,
	validations,
	createFieldValidator,
} from '../../core/utils/validations/ui';
import { Button, Input, Toaster, ValidationList } from '../../components';
import { PASSWORD_VALIDATIONS_LIST, passwordFieldValidator } from './constants';

const RegisterNewPasswordForm: Component = () => {
	const [newPassword, setNewPassword] = React.useState<string>('');
	const [confirmPassword, setConfirmPassword] = React.useState<string>('');
	const [isSubmitingForm, setIsSubmitingForm] = React.useState<boolean>(false);

	const router = useRouter();

	const validateIfIsDiferentPassword: ValidationsTypes.ValidateFn = () => {
		return newPassword !== confirmPassword;
	};

	const confirmPasswordValidator = createFieldValidator(
		validateIfIsDiferentPassword,
		'As senhas devem ser iguais.'
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setIsSubmitingForm(true);

			const response = await changeUserPassword({
				newPassword,
				confirmPassword,
			});

			if (!response) {
				throw new Error(
					'Não foi possível realizar a ação nesse momento, tente novamente mais tarde.'
				);
			}

			const { success, message, code } = response;

			const isRedirectStatusCode = code === 307;

			if (!success && isRedirectStatusCode) {
				Toaster.open({
					message: message!,
					position: 'topRight',
					status: 'error',
				});

				router.push('/auth/login');

				return;
			}

			if (!success) throw new Error(message);

			Toaster.open({
				message: 'Senha alterada com sucesso. Faça login novamente.',
				position: 'topRight',
				status: 'success',
			});

			router.push('/auth/login');
		} catch (err) {
			Toaster.open({
				message: (err as Error).message,
				position: 'topRight',
				status: 'error',
			});

			setIsSubmitingForm(false);
		}
	};

	const hasErrorInForm =
		validations.password.complexity(newPassword) ||
		validateIfIsDiferentPassword();

	return (
		<form onSubmit={handleSubmit} className='w-full'>
			<Input
				label='Nova senha*'
				type='password'
				placeholder='************'
				value={newPassword}
				onChangeText={setNewPassword}
				validateError={passwordFieldValidator}
			/>

			<ValidationList
				validations={PASSWORD_VALIDATIONS_LIST}
				value={newPassword}
				className='mb-6'
			/>

			<Input
				label='Confirme a nova senha*'
				type='password'
				placeholder='************'
				elementsClasses={{ container: 'mb-1' }}
				value={confirmPassword}
				onChangeText={setConfirmPassword}
				validateError={confirmPasswordValidator}
			/>

			<Button
				type='submit'
				isFullWidth
				disabled={isSubmitingForm || hasErrorInForm}
			>
				{isSubmitingForm ? 'Carregando...' : 'Resetar'}
			</Button>
		</form>
	);
};

export default RegisterNewPasswordForm;

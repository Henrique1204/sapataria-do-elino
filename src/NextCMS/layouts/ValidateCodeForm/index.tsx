'use client';

import React from 'react';

import { Input, Button, Toaster } from '../../components';

import validateCode from 'actions/NextCMS/auth/validateCode';
import sendCode from 'actions/NextCMS/auth/sendCode';

import useTimer from '../../hooks/useTimer';

const NUMBER_OF_DIGITS_IN_CODE = 4;
const TIME_TO_READ_MESSAGE = 2 * 1000;

const THRESHOLD_TIMER = 0;
const START_TIMER = 30;

const ValidateCodeForm: Component = () => {
	const [code, setcode] = React.useState<string>('');

	const [isSubmitingForm, setIsSubmitingForm] = React.useState<boolean>(false);
	const [isResendCode, setIsResendCode] = React.useState<boolean>(false);

	const {
		seconds: secondsLeftToResendToken,
		start: startTimer,
		clear,
	} = useTimer({
		startWith: START_TIMER,
		threshold: THRESHOLD_TIMER,
		isResettable: false,
	});

	const hasErrorInForm = code.length !== NUMBER_OF_DIGITS_IN_CODE;

	const isAllowedToSendCode = secondsLeftToResendToken === THRESHOLD_TIMER;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setIsSubmitingForm(true);

			const { success, message } = await validateCode(code);

			if (!success) throw new Error(message);

			Toaster.open({
				message:
					'Usuário válidado, por favor confirme suas credenciais novamente.',
				position: 'topRight',
				status: 'success',
			});

			return setTimeout(() => {
				window.location.href = '/auth/login';
			}, TIME_TO_READ_MESSAGE);
		} catch (e) {
			Toaster.open({
				message: (e as Error).message,
				position: 'topRight',
				status: 'error',
			});

			setIsSubmitingForm(false);
		}
	};

	const handleResendCode = async () => {
		try {
			setIsResendCode(true);

			const { success, message } = await sendCode();

			if (!success) throw new Error(message);

			startTimer();

			Toaster.open({
				message: 'Token enviado com sucesso!.',
				position: 'topRight',
				status: 'success',
			});
		} catch (e) {
			Toaster.open({
				message: (e as Error).message,
				position: 'topRight',
				status: 'error',
			});
		} finally {
			setIsResendCode(false);
		}
	};

	React.useEffect(() => {
		startTimer();

		return () => clear();
	}, []);

	return (
		<form onSubmit={handleSubmit} className='w-full'>
			<Input
				label='Código'
				type='token'
				quantity={NUMBER_OF_DIGITS_IN_CODE}
				value={code}
				onChangeText={setcode}
			/>

			<Button
				variant='link'
				onClick={handleResendCode}
				className='mb-4 underline decoration-2 underline-offset-8'
				type='button'
				isFullWidth
				disabled={!isAllowedToSendCode || isResendCode}
			>
				{isAllowedToSendCode
					? 'Reenviar código'
					: `Solicitar em ${secondsLeftToResendToken} segundos...`}
			</Button>

			<Button
				type='submit'
				isFullWidth
				disabled={isSubmitingForm || hasErrorInForm}
			>
				{isSubmitingForm ? 'Confirmando...' : 'Confirmar token'}
			</Button>
		</form>
	);
};

export default ValidateCodeForm;

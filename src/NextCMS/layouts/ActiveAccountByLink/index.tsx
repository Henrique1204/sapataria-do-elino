'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import validateActivationCodeByToken from 'actions/NextCMS/auth/validateActivationCodeByToken';

import useTimer from '../../hooks/useTimer';

import { Toaster, Loader, Button, GradientCheckCircle } from '../../components';

const INITIAL_COUNTDOWN = 5;
const LOGIN_PATH = '/auth/login';

const ActiveAccountByLink: Component<{ token: string }> = ({ token }) => {
	const [status, setStatus] = React.useState<'loading' | 'success'>('loading');

	const router = useRouter();

	const hasValidated = React.useRef(false);

	const redirectToLogin = () => router.push(LOGIN_PATH);

	const {
		seconds: countdown,
		start: startCountdown,
		clear: clearCountdown,
	} = useTimer({
		startWith: INITIAL_COUNTDOWN,
		threshold: 0,
		isResettable: false,
		onComplete: redirectToLogin,
	});

	const notifyActivationSuccess = () => {
		Toaster.open({ message: 'Conta ativada com sucesso!', status: 'success' });
	};

	const handleValidateToken = async () => {
		if (!token) {
			Toaster.open({ message: 'Token não fornecido', status: 'error' });
			redirectToLogin();
			return;
		}

		const response = await validateActivationCodeByToken(token);

		if (!response.success) {
			Toaster.open({ message: response.message!, status: 'error' });
			redirectToLogin();
			return;
		}

		setStatus('success');
		notifyActivationSuccess();
	};

	React.useEffect(() => {
		if (hasValidated.current) return;

		hasValidated.current = true;
		handleValidateToken();
	}, [token]);

	React.useEffect(() => {
		if (status === 'success') startCountdown();
		return clearCountdown;
	}, [status]);

	return (
		<div className='fixed z-10 left-0 top-0 w-screen h-screen bg-cms-content-light flex justify-center pt-40'>
			<Loader.Loader isLoading={status === 'loading'}>
				<div className='flex flex-col items-center h-screen px-4 text-center'>
					<GradientCheckCircle />

					<h1 className='text-2xl font-bold mb-4 text-cms-content-dark'>
						Conta ativada!
					</h1>

					<p className='text-cms-content-main'>
						Você será redirecionado para o login em <strong>{countdown}</strong>{' '}
						segundos.
					</p>

					<Button
						type='button'
						variant='primary'
						onClick={redirectToLogin}
						className='mt-6'
					>
						Ir para Login agora
					</Button>
				</div>
			</Loader.Loader>
		</div>
	);
};

export default ActiveAccountByLink;

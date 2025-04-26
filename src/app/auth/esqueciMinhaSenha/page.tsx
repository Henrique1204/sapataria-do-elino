import * as NextCMSComponents from 'NextCMS/components';
import * as NextCMSLayouts from 'NextCMS/layouts';

const ForgotPassword: Page<'ForgotPassword'> = async () => {
	return (
		<>
			<NextCMSComponents.HeaderTitles
				title='Digite seu e-mail abaixo para enviarmos as instruções ao seu e-mail:'
				subtitle='Resete sua senha'
			/>

			<NextCMSLayouts.EmailToResetPassword />
		</>
	);
};

export default ForgotPassword;

import * as NextCMSComponents from 'NextCMS/components';
import * as NextCMSLayouts from 'NextCMS/layouts';

const ValidateUserEmail: Page<'ValidateUserEmail'> = async () => {
	return (
		<>
			<NextCMSComponents.HeaderTitles
				title='Enviamos um código de 4 dígitos para você validar a sua conta.'
				subtitle='Cheque seu e-mail'
			/>

			<NextCMSLayouts.ValidateCodeInResetPassword />
		</>
	);
};

export default ValidateUserEmail;

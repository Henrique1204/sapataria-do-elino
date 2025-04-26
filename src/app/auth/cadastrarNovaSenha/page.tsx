import * as NextCMSComponents from 'NextCMS/components';
import * as NextCMSLayouts from 'NextCMS/layouts';

const RegisterNewPassword: Page<'RegisterNewPassword'> = async () => {
	return (
		<>
			<NextCMSComponents.HeaderTitles
				title='Preencha os campos abaixo para resetar a sua senha'
				subtitle='Resetar senha'
			/>

			<NextCMSLayouts.RegisterNewPasswordForm />
		</>
	);
};

export default RegisterNewPassword;

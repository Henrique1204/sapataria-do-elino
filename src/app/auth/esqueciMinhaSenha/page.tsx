import * as NextCMSComponents from 'NextCMS/components';
import * as NextCMSLayouts from 'NextCMS/layouts';

const Login: Page<'Login'> = async () => {
	return (
		<>
			<NextCMSComponents.HeaderTitles
				title='Realize seu login abaixo:'
				subtitle='Que bom ter você aqui!!'
			/>

			<NextCMSLayouts.LoginForm />
		</>
	);
};

export default Login;

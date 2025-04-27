import * as Types from './types';

export const Loading: Component = ({ testId = 'loading' }) => {
	return (
		<div
			data-testid={testId}
			className={'w-10 h-10 rounded-full bg-cms-primary-main'}
		>
			<div className='w-10 h-10 rounded-full bg-cms-primary-light animate-ping' />
		</div>
	);
};

export const Loader: ComponentWithChildren<Types.LoaderProps> = ({
	isLoading,
	children,
	...props
}) => {
	if (isLoading) return <Loading {...props} />;

	return <>{children}</>;
};

import * as HomeContent from 'components/Home';

const Home: Page<'Home'> = async () => {
	return (
		<>
			<HomeContent.Introduction />

			{/* @ts-expect-error Async Server Component */}
			<HomeContent.Service />

			<HomeContent.Contact />
		</>
	);
};

export default Home;

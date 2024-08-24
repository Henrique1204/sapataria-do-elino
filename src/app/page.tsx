import * as HomeContent from 'components/Home';

const Home: Page<'Home'> = async () => {
	return (
		<>
			<HomeContent.Introduction />

			<HomeContent.Service />

			<HomeContent.Contact />
		</>
	);
};

export default Home;

import Introduction from 'components/Home/Introduction';

const Home: Page<'Home'> = async () => {
	return (
		<>
			<Introduction />

			<main>Serviços</main>
			<section>Contato</section>
		</>
	);
};

export default Home;

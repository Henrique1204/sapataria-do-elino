import { Metadata } from 'next';

import introductionGet from 'actions/cms/introduction-get';
import contactGet from 'actions/cms/contact-get';

import * as HomeContent from 'components/Home';
import Header from 'components/Header';
import Footer from 'components/Footer';

const Home: Page<'Home'> = async () => {
	const introductionData = await introductionGet();
	const contactData = await contactGet();

	return (
		<>
			<Header />

			<HomeContent.Introduction {...introductionData} />

			<HomeContent.Service />

			<HomeContent.Contact {...contactData} />

			<Footer />
		</>
	);
};

export default Home;

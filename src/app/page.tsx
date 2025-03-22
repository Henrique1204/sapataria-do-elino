import { Metadata } from 'next';

import introductionGet from 'actions/cms/introduction-get';
import contactGet from 'actions/cms/contact-get';

import * as HomeContent from 'components/Home';

const Home: Page<'Home'> = async () => {
	const introductionData = await introductionGet();
	const contactData = await contactGet();

	return (
		<>
			<HomeContent.Introduction {...introductionData} />

			<HomeContent.Service />

			<HomeContent.Contact {...contactData} />
		</>
	);
};

export default Home;

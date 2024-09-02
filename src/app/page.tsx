import { Metadata } from 'next';

import introductionGet from 'actions/cms/introduction-get';
import contactGet from 'actions/cms/contact-get';

import * as HomeContent from 'components/Home';

const AppUrl = process.env.NEXT_PUBLIC_APP_URL;

export const metadata: Metadata = {
	title: 'Sapataria do Elino',
	description:
		'Serviços especializados em conserto e customização de sapatos, bolsas, malas e itens de couro. Qualidade garantida para todos os tipos de calçados e acessórios.',
	keywords: [
		'conserto de sapatos',
		'customização de calçados',
		'conserto de bolsas',
		'reparos em malas',
		'restauração de itens de couro',
		'serviços de sapataria',
		'conserto de acessórios de couro',
		'conserto de calçados de couro',
		'consertos de malas de viagem',
		'personalização de sapatos e bolsas',
	],
	openGraph: {
		title: 'Sapataria do Elino',
		description:
			'Serviços especializados em conserto e customização de sapatos, bolsas, malas e itens de couro. Qualidade garantida para todos os tipos de calçados e acessórios.',
		url: AppUrl,
		siteName: 'Sapataria do Elino',
		locale: 'pt_BR',
		type: 'website',
		images: [
			{
				url: `${AppUrl}/images/og-image.png`,
				width: 1200,
				height: 630,
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	twitter: {
		title: 'Sapataria do Elino',
		card: 'summary_large_image',
	},
	verification: {
		google: 'google-site-verification-code',
		yandex: 'yandex-verification-code',
	},
};

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

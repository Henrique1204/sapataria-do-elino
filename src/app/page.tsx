import { Metadata } from 'next';

import * as HomeContent from 'components/Home';

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
		url: 'https://sapatariadoelino.com.br',
		siteName: 'Sapataria do Elino',
		locale: 'pt_BR',
		type: 'website',
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
	return (
		<>
			<HomeContent.Introduction />

			<HomeContent.Service />

			<HomeContent.Contact />
		</>
	);
};

export default Home;

import { Metadata } from 'next';
import Script from 'next/script';

import classNames from 'classnames';

import { fontPrimary, fontSecondary } from 'core/assets/font';

import Boot from 'components/Boot';

import './global.css';

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

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const rootClassNames = classNames(
		fontPrimary.variable,
		fontSecondary.variable
	);

	return (
		<html className={rootClassNames} lang='pt-BR'>
			<head>
				<Script src='https://cdn.jsdelivr.net/npm/import-map-overrides@2.2.0/dist/import-map-overrides.js' />
				<Script src='https://cdn.jsdelivr.net/npm/systemjs@6.14.1/dist/system.min.js' />
				<Script src='https://cdn.jsdelivr.net/npm/systemjs@6.14.1/dist/extras/amd.min.js' />

				<Script type='systemjs-importmap' src='/dns/deps.json' />
				<Script type='systemjs-importmap' src='/dns/mfe.json' />
			</head>
			<body className='bg-secondary-darker text-content-light'>
				<Boot />

				{children}
			</body>
		</html>
	);
};

export default RootLayout;

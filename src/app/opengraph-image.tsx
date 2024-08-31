// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

import { fontSecondary } from '../core/assets/font';

import tailwindConfig from '../../tailwind.config';

export const runtime = 'edge';

export const alt =
	'Sapataria do Elino - Especialistas em Consertos e Customizações de Calçados, Bolsas e Itens de Couro.';

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = 'image/png';

const extractColors = (config: any) => {
	return config.theme?.colors || {};
};

const loadLocalFont = async (fontPath: string) => {
	const response = await fetch(new URL(fontPath, import.meta.url));

	return await response.arrayBuffer();
};

const Image = async () => {
	const axiformaData = await loadLocalFont('./Axiforma-Regular.woff2');

	const colors = extractColors(tailwindConfig);

	return new ImageResponse(
		(
			<div
				style={{
					background: colors.secondary?.main || '#462521',
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					color: colors.content?.lighter || '#EAE8E6',
					fontFamily: fontSecondary.style.fontFamily,
				}}
			>
				<div
					style={{
						fontSize: 60,
						fontWeight: 700,
						marginBottom: 20,
						textAlign: 'center',
						color: colors.primary?.main || '#F0AC3C',
					}}
				>
					Sapataria do Elino
				</div>

				<div
					style={{
						fontSize: 30,
						fontWeight: 400,
						marginBottom: 40,
						textAlign: 'center',
						maxWidth: '80%',
						fontFamily: fontSecondary.style.fontFamily,
					}}
				>
					Especialistas em Consertos e Customizações de Calçados, Bolsas e Itens
					de Couro
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-around',
						width: '100%',
					}}
				>
					{['Reparos', 'Customizações', 'Restaurações'].map(
						(service, index) => (
							<div
								key={index}
								style={{
									border: `2px solid ${colors.content?.lighter || '#EAE8E6'}`,
									borderRadius: 15,
									padding: '10px 20px',
									fontSize: 24,
									fontFamily: fontSecondary.style.fontFamily,
								}}
							>
								{service}
							</div>
						)
					)}
				</div>
			</div>
		),
		{
			...size,
			fonts: [
				{
					name: 'Axiforma',
					data: axiformaData,
					style: 'normal',
					weight: 400,
				},
			],
		}
	);
};

export default Image;

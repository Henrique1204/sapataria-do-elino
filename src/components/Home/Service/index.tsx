'use server';
import React from 'react';

import Image from 'next/image';

import servicesGet from 'actions/cms/services-get';

import { generateImageSrc } from 'core/utils/images';

import * as Content from 'components/Content';
import * as Card from 'components/Card';
import ServicesList from 'components/ServicesList';

const Service = async () => {
	const servicesData = await servicesGet();

	return (
		<Content.Wrapper
			id='servicos'
			as='main'
			variant='secondary'
			className='flex flex-col items-center gap-14 pr-0 lg:pr-8'
		>
			<Content.Title content='Serviços' />

			<div className='container !flex-row !justify-start lg:!justify-center hideScrollbar overflow-x-scroll lg:overflow-x-auto !pr-4'>
				{servicesData.map(({ id, itens, imageSrc, title }) => (
					<Card.Wrapper
						key={id}
						className='col-8 min-w-[300px] sm:min-w-[320px] sm:col-2'
					>
						<Image
							src={generateImageSrc(imageSrc)}
							alt={`Imagem ilustrativa de ${title} para conserto.`}
							width={340}
							height={220}
						/>

						<Card.Content>
							<Card.Title content={title} className='mb-6' />

							<ServicesList testId={`${id}-services`} services={itens} />
						</Card.Content>
					</Card.Wrapper>
				))}
			</div>
		</Content.Wrapper>
	);
};

export default Service as any as Component;

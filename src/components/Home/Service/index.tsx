import React from 'react';

import Image from 'next/image';

import servicesGet from 'actions/services-get';

import * as Content from 'components/Content';
import * as Card from 'components/Card';
import ServicesList from 'components/ServicesList';

const Service = async () => {
	const servicesByCategory = await servicesGet();

	return (
		<Content.Wrapper
			id='servicos'
			as='main'
			variant='secondary'
			className='flex flex-col items-center gap-14 pr-0 lg:pr-8'
		>
			<Content.Title content='Serviços' />

			<div className='container !justify-start lg:!justify-center hideScrollbar overflow-x-scroll lg:overflow-x-auto'>
				{servicesByCategory.map(({ category, services, imageSrc, title }) => (
					<Card.Wrapper key={category} className='col-2 sm:min-w-[320px]'>
						<Image
							src={imageSrc}
							alt='Imagem ilustrativa de sapatos para conserto.'
							width={340}
							height={220}
						/>

						<Card.Content>
							<Card.Title content={title} className='mb-6' />

							<ServicesList testId={category} services={services} />
						</Card.Content>
					</Card.Wrapper>
				))}
			</div>
		</Content.Wrapper>
	);
};

export default Service;

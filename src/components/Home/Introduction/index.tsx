import React from 'react';

import Image from 'next/image';

import * as Content from 'components/Content';
import Button from 'components/Button';

const Introduction: Component = () => {
	return (
		<Content.Wrapper className='container'>
			<Image
				className='col-3 h-[620px] rounded-xl grid-gap'
				src='/images/introduction-banner-md.jpg'
				alt='Foto monstrando um sapateiro trabalhando.'
				width={600}
				height={720}
				priority
			/>

			<div className='col-3 flex flex-col items-start justify-start pl-12'>
				<Content.Title content='Sapataria do Elino' className='mb-6' />

				<p className='text-content-main font-body text-xl mb-4'>
					Sapateiro por mais de 70 anos, especializado em consertos de sapatos,
					bolsas, malas e peças de couro no geral.
				</p>

				<p className='text-content-main font-body text-xl'>
					Ao longo da minha carreira, trabalhei em diversas sapatarias pelo
					estado de São Paulo e mantive minha própria sapataria no bairro de
					Vargem Grande.
				</p>

				<Button className='px-6 text-xl bold mt-10' href=''>
					Contato
				</Button>
			</div>
		</Content.Wrapper>
	);
};

export default Introduction;

'use client';
import React from 'react';

import Image from 'next/image';

import { handleScrollToSection } from 'core/utils/events/handleScrollToSection';

import * as Content from 'components/Content';
import Button from 'components/Button';

const Introduction: Component = () => {
	return (
		<Content.Wrapper id='sobre' className='container'>
			<Image
				className='rounded-xl grid-gap order-2 col-8 h-[300px] sm:col-2 sm:h-[520px] sm:order-1 lg:col-3 lg:h-[620px]'
				src='/images/introduction-banner-md.jpg'
				alt='Foto monstrando um sapateiro trabalhando.'
				width={600}
				height={720}
				priority
			/>

			<div className='col-8 flex flex-col items-start justify-start order-1 sm:col-3 sm:order-2 sm:pl-6 lg:pl-12'>
				<Content.Title content='Sapataria do Elino' className='mb-6' />

				<p className='text-content-main font-body text-base mb-4 text-center sm:text-xl sm:text-start'>
					Sapateiro por mais de 70 anos, especializado em consertos de sapatos,
					bolsas, malas e peças de couro no geral.
				</p>

				<p className='text-content-main font-body text-xl hidden sm:block'>
					Ao longo da minha carreira, trabalhei em diversas sapatarias pelo
					estado de São Paulo e mantive minha própria sapataria no bairro Vargem
					Grande.
				</p>

				<Button
					className='px-6 text-xl bold mt-10 hidden sm:block'
					onClick={handleScrollToSection('#contato')}
				>
					Contato
				</Button>
			</div>
		</Content.Wrapper>
	);
};

export default Introduction;

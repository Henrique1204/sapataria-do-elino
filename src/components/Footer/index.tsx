import React from 'react';

import Image from 'next/image';

const Footer: Component = () => {
	return (
		<footer className='container pb-5'>
			<div className='col-6 flex gap-4 items-center'>
				<Image
					className='w-14'
					src='/images/logo-amarelo.png'
					alt='Sapataria do Elino'
					width={64}
					height={64}
					priority
				/>

				<h3 className='font-title text-sm text-content-main'>
					Sapataria do Elino
				</h3>
			</div>

			<p className='mt-5 font-body col-8 text-center text-sm text-content-main'>
				Todos os direitos reservados
			</p>
		</footer>
	);
};

export default Footer;

import React from 'react';

import * as Content from 'components/Content';
import * as ContactInfo from 'components/ContactInfo';

const Contact: Component = () => {
	return (
		<Content.Wrapper id='contact' className='flex flex-col items-center gap-14'>
			<Content.Title content='Contato' />

			<div className='container'>
				<div className='col-3'>
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d912.2333849069178!2d-46.70807881842662!3d-23.85649363425104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce37cb613abd43%3A0xbd88ea61a6d27ca5!2sAv.%20Primavera%20-%20Parelheiros%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004896-120!5e0!3m2!1spt-BR!2sbr!4v1724713565460!5m2!1spt-BR!2sbr'
						width='500'
						height='310'
						style={{ border: 0 }}
						allowFullScreen={false}
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
						className='rounded-xl'
					/>

					<ContactInfo.Group className='mt-6'>
						<ContactInfo.Title content='Endereço' />

						<ContactInfo.Info
							content='Av. Primavera, 107 - Vargem Grande, próximo a Parelheiros. São Paulo, SP.'
							className='max-w-[400px]'
						/>
					</ContactInfo.Group>
				</div>

				<div className='col-3 pl-10'>
					<ContactInfo.Group>
						<ContactInfo.Title content='Telefones' />

						<ContactInfo.Info content='(11) 98764-5678' />
						<ContactInfo.Info content='(11) 2659-7321' />
					</ContactInfo.Group>

					<ContactInfo.Group className='mt-10'>
						<ContactInfo.Title content='E-mail' />

						<ContactInfo.Info content='sapataria_elino@gmail.com' />
						<ContactInfo.Info content='paulo.souza@gmail.com' />
					</ContactInfo.Group>
				</div>
			</div>
		</Content.Wrapper>
	);
};

export default Contact;

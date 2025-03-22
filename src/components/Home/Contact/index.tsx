import React from 'react';

import { ContactData } from 'types/actions/cms';

import { formatPhone } from 'core/utils/formatters/phone';

import * as Content from 'components/Content';
import * as ContactInfo from 'components/ContactInfo';

const Contact: Component<ContactData> = ({
	address,
	emails,
	phones,
	mapUrl,
}) => {
	const hasMultiplesPhones = phones.length > 1;
	const hasMultiplesEmails = emails.length > 1;

	const isCellPhoneNumber = (phoneNumber: string): boolean => {
		const CELL_PHONE_LENGTH = 11;

		return phoneNumber.length === CELL_PHONE_LENGTH;
	};

	const generatePhoneLink = (phoneNumber: string): string => {
		const COUNTRY_CODE = '55';
		const WHATSAPP_URL = 'https://wa.me/';
		const WHATSAPP_DEFAULT_MESSAGE = 'Ola%2C+estou+interessado+no+seu+servico';
		const TEL_SCHEME = 'tel:+';

		const isCellPhone = isCellPhoneNumber(phoneNumber);

		if (isCellPhone) {
			return `${WHATSAPP_URL}${COUNTRY_CODE}${phoneNumber}?text=${WHATSAPP_DEFAULT_MESSAGE}`;
		}

		return `${TEL_SCHEME}${COUNTRY_CODE}${phoneNumber}`;
	};

	return (
		<Content.Wrapper id='contato' className='flex flex-col items-center gap-14'>
			<Content.Title content='Contato' />

			<div className='container'>
				<div className='w-full sm:col-2 lg:col-3'>
					<iframe
						src={mapUrl}
						width='500'
						height='310'
						style={{ border: 0 }}
						allowFullScreen={false}
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
						className='rounded-xl w-full h-[320px] sm:w-[320px] sm:h-[320px] lg:w-[500px] lg:h-[310px]'
					/>

					<ContactInfo.Group className='mt-6'>
						<p className='hidden'>Sapataria do Elino</p>
						<ContactInfo.Title content='Endereço' />

						<ContactInfo.Info content={address} className='max-w-[400px]' />
					</ContactInfo.Group>
				</div>

				<div className='pl-0 col-8 sm:col-3 sm:pl-6 lg:pl-12'>
					<ContactInfo.Group>
						<ContactInfo.Title
							content={hasMultiplesPhones ? 'Telefones' : 'Telefone'}
						/>

						{phones.map((phone) => (
							<ContactInfo.Info
								key={phone}
								as='a'
								href={generatePhoneLink(phone)}
								target='_blank'
								content={formatPhone(phone)}
							/>
						))}
					</ContactInfo.Group>

					<ContactInfo.Group className='mt-10'>
						<ContactInfo.Title
							content={hasMultiplesEmails ? 'E-mails' : 'E-mail'}
						/>

						{emails.map((email) => (
							<ContactInfo.Info
								key={email}
								as='a'
								href={`mailto:${email}`}
								target='_blank'
								content={email}
							/>
						))}
					</ContactInfo.Group>
				</div>
			</div>
		</Content.Wrapper>
	);
};

export default Contact;

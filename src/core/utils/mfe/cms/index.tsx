'use client';

import introductionGet from 'actions/cms/introduction-get';
import servicesGet from 'actions/cms/services-get';
import contactGet from 'actions/cms/contact-get';

const _handleCMSError = async (error: unknown) => {
	const errorHasName = Boolean((error as any).name);

	if (errorHasName) {
		const errorName = (error as { name: string }).name;

		const { exceptions } = await window.System.import(
			'@henrique1204/cms-utility'
		);

		if (errorName in exceptions.CMSSchemaStoreExceptions) return;
	}

	throw error;
};

const setupIntroductionCMS = async () => {
	try {
		const GROUP_ID = 'introduction';

		const { useCases } = await window.System.import(
			'@henrique1204/cms-utility'
		);

		const { createGroup, addField } = useCases.CMSSchema;

		createGroup({
			id: GROUP_ID,
			title: 'Introdução',
		});

		addField({
			id: 'apresentation',
			defaultValue: '',
			groupId: GROUP_ID,
			label: 'Apresentação',
			type: 'text',
			onReceiveValue: async () => {
				const { apresentation } = await introductionGet();

				return apresentation;
			},
			onUpdateValue: async () => {},
		});

		addField({
			id: 'bannerSrc',
			defaultValue: '',
			groupId: GROUP_ID,
			label: 'Banner',
			type: 'image',
			onReceiveValue: async () => {
				const { bannerSrc } = await introductionGet();

				return bannerSrc;
			},
			onUpdateValue: async () => {},
		});

		addField({
			id: 'depoyment',
			defaultValue: '',
			groupId: GROUP_ID,
			label: 'Depoimento',
			type: 'text',
			onReceiveValue: async () => {
				const { depoyment } = await introductionGet();

				return depoyment;
			},
			onUpdateValue: async () => {},
		});
	} catch (error) {
		await _handleCMSError(error);
	}
};

const setupServicesCMS = async () => {
	try {
		const GROUP_ID = 'services';

		const { useCases } = await window.System.import(
			'@henrique1204/cms-utility'
		);

		const { createGroup, addField } = useCases.CMSSchema;

		createGroup({
			id: GROUP_ID,
			title: 'Serviços',
		});
	} catch (error) {
		await _handleCMSError(error);
	}
};

const setupContactCMS = async () => {
	try {
		const GROUP_ID = 'contact';

		const { useCases } = await window.System.import(
			'@henrique1204/cms-utility'
		);

		const { createGroup, addField } = useCases.CMSSchema;

		createGroup({
			id: GROUP_ID,
			title: 'Contato',
		});

		addField({
			id: 'address',
			defaultValue: '',
			groupId: GROUP_ID,
			label: 'Endereço',
			type: 'text',
			onReceiveValue: async () => {
				const { address } = await contactGet();

				return address;
			},
			onUpdateValue: async () => {},
		});

		addField({
			id: 'mapUrl',
			defaultValue: '',
			groupId: GROUP_ID,
			label: 'Url do Mapa',
			type: 'text',
			onReceiveValue: async () => {
				const { mapUrl } = await contactGet();

				return mapUrl;
			},
			onUpdateValue: async () => {},
		});
	} catch (error) {
		await _handleCMSError(error);
	}
};

export const setupCMS = async () => {
	await setupIntroductionCMS();
	await setupServicesCMS();
	await setupContactCMS();
};

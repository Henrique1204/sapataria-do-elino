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
			onReceiveValue: introductionGet,
			onUpdateValue: async () => {},
		});

		addField({
			id: 'apresentation',
			defaultValue: '',
			groupId: GROUP_ID,
			label: 'Apresentação',
			type: 'text',
		});

		addField({
			id: 'bannerSrc',
			defaultValue: '',
			groupId: GROUP_ID,
			label: 'Banner',
			type: 'image',
		});

		addField({
			id: 'depoyment',
			defaultValue: '',
			groupId: GROUP_ID,
			label: 'Depoimento',
			type: 'text',
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
			onReceiveValue: async () => {
				return {};
			},
			onUpdateValue: async () => {},
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
			onReceiveValue: contactGet,
			onUpdateValue: async () => {},
		});

		addField({
			id: 'address',
			defaultValue: '',
			groupId: GROUP_ID,
			label: 'Endereço',
			type: 'text',
		});

		addField({
			id: 'mapUrl',
			defaultValue: '',
			groupId: GROUP_ID,
			label: 'Url do Mapa',
			type: 'text',
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

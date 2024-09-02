'use server';

import { ContactData } from 'types/actions/cms';

import CMSData from './cms-data.json';

const contactGet = async (): Promise<ContactData> => {
	const contactData = CMSData.contact;

	return contactData;
};

export default contactGet;

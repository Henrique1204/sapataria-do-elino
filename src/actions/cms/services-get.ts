'use server';

import { ServiceData } from 'types/actions/cms';

import CMSData from './cms-data.json';

const servicesGet = async (): Promise<ServiceData[]> => {
	const servicesData = CMSData.services;

	return servicesData;
};

export default servicesGet;

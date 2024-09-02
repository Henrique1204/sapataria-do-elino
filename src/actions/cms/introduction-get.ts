'use server';

import { IntroductionData } from 'types/actions/cms';

import CMSData from './cms-data.json';

const introductionGet = async (): Promise<IntroductionData> => {
	const introductionData = CMSData.introduction;

	return introductionData;
};

export default introductionGet;

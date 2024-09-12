'use client';

import React from 'react';

import MFEService from 'core/utils/mfe';
import { setupCMS } from 'core/utils/mfe/cms';

const Boot: Component = () => {
	const startMFE = async () => {
		try {
			await MFEService.onStart();

			await setupCMS();
		} catch (_) {}
	};

	React.useEffect(() => {
		startMFE();

		return () => {
			MFEService.onDestroy();
		};
	}, []);

	return <></>;
};

export default Boot;

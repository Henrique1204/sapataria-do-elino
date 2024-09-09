'use client';

import React from 'react';

import MFEService from 'core/utils/mfe';

const Boot: Component = () => {
	React.useEffect(() => {
		MFEService.onStart();

		return () => {
			MFEService.onDestroy();
		};
	}, []);

	return <></>;
};

export default Boot;

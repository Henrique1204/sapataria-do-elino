'use client';

import React from 'react';

import MFEService from 'core/utils/mfe';

const CmsMFE: Component = () => {
	React.useEffect(() => {
		MFEService.register('@henrique1204/cms', '/cms');
	}, []);

	return <></>;
};

export default CmsMFE;

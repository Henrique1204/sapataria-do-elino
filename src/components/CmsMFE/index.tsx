'use client';
import React from 'react';

import { useRouter } from 'next/navigation';

import MFEService from 'core/utils/mfe';

const CmsMFE: Component = () => {
	const router = useRouter();

	React.useEffect(() => {
		MFEService.register('@henrique1204/cms', '/cms', {
			appName: 'Saparatia do Elino',
			onLogout: () => router.push('/'),
		});
	}, []);

	return <></>;
};

export default CmsMFE;

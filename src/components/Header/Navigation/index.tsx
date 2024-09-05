import React from 'react';

import DesktopNavigation from './components/DesktopNavigation';
import MobileNavigation from './components/MobileNavigation';

import * as Types from '../Link/types';

export const Navigation: Component<Pick<Types.LinkProps, 'variant'>> = ({
	variant,
}) => {
	return (
		<>
			<MobileNavigation />
			<DesktopNavigation variant={variant} />
		</>
	);
};

import React from 'react';

import MobileNavigation from 'components/Header/Navigation/MobileNavigation';
import DesktopNavigation from 'components/Header/Navigation/DesktopNavigation';

import * as Types from '../Link/types';

export const Navigation: Component<Pick<Types.LinkProps, 'variant'>> = ({
	variant,
}) => {
	return (
		<>
			<MobileNavigation />
			<DesktopNavigation className={variant} />
		</>
	);
};

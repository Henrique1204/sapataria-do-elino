import React from 'react';

import * as Types from './types';

const Show: ComponentWithChildren<Types.ShowProps> = ({
	isShowing,
	children,
}) => {
	if (isShowing) return <>{children}</>;

	return <></>;
};

export default Show;

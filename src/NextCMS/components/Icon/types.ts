import { HTMLProps } from 'react';

import * as IconsList from './assets';

export type IconsListType = typeof IconsList;
export type IconsListKeys = keyof IconsListType;

export type IconProps = HTMLProps<SVGElement> & {
	name: IconsListKeys;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

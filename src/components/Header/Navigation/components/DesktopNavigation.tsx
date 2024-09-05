import React from 'react';

import { handleScrollToSection } from 'core/utils/events/handleScrollToSection';

import Button from 'components/Button';

import { LINKS } from '../constants';

import * as Types from '../../Link/types';
import Link from '../../Link';

const DesktopNavigation: Component<Pick<Types.LinkProps, 'variant'>> = ({
	variant = 'primary',
}) => {
	return (
		<nav className='hidden sm:block'>
			<ul className='flex gap-2'>
				{LINKS.map(({ href, label, isButton }) => {
					const key = `link-item-${label.toLowerCase()}`;

					if (isButton) {
						return (
							<li key={key}>
								<Button
									as={'a'}
									href={href}
									variant={variant}
									onClick={handleScrollToSection(href)}
								>
									{label}
								</Button>
							</li>
						);
					}

					return (
						<li key={key}>
							<Link
								label={label}
								href={href}
								variant={variant}
								onClick={handleScrollToSection(href)}
							/>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default DesktopNavigation;

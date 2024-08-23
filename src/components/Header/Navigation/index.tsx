import * as Types from '../Link/types';

import * as Links from '../Link';

import { LINKS } from './constants';

export const Navigation: Component<Pick<Types.LinkProps, 'variant'>> = ({
	variant = 'primary',
}) => {
	return (
		<nav>
			<ul className='flex gap-2'>
				{LINKS.map(({ href, label, isButton }) => {
					const key = `link-item-${label.toLowerCase()}`;

					if (isButton) {
						return (
							<li key={key}>
								<Links.LinkButton label={label} href={href} variant={variant} />
							</li>
						);
					}

					return (
						<li key={key}>
							<Links.Link label={label} href={href} variant={variant} />
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

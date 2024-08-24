import { LINKS } from './constants';

import * as Types from '../Link/types';

import Link from '../Link';

import Button from 'components/Button';

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
								<Button as={'a'} href={href} variant={variant}>
									{label}
								</Button>
							</li>
						);
					}

					return (
						<li key={key}>
							<Link label={label} href={href} variant={variant} />
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

import { LINKS } from './constants';

import * as Types from '../Link/types';

import Link from '../Link';

import Button from 'components/Button';

export const Navigation: Component<Pick<Types.LinkProps, 'variant'>> = ({
	variant = 'primary',
}) => {
	const handleScrollToSection =
		(href: string): React.MouseEventHandler<HTMLAnchorElement> =>
		(e) => {
			e.preventDefault();

			const section = document.querySelector(href) as HTMLDivElement;

			if (!section) return;

			const sectionTopOffset = section.getBoundingClientRect().top;

			const SCROLL_THRESHOLD = 300;
			const HEADER_HEIGHT_OFFSET = 96;

			const isBelowScrollThreshold = section.offsetTop < SCROLL_THRESHOLD;

			const scrollOffset = HEADER_HEIGHT_OFFSET;

			const targetPosition =
				sectionTopOffset + window.pageYOffset - scrollOffset;

			const scrollTop = isBelowScrollThreshold ? 0 : targetPosition;

			window.scrollTo({
				top: scrollTop,
				behavior: 'smooth',
			});
		};

	return (
		<nav>
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

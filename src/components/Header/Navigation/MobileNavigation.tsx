'use client';

import React from 'react';

import classNames from 'classnames';

import { handleScrollToSection } from 'core/utils/events/handleScrollToSection';
import MenuMobileEvents from 'core/utils/events/customEvents/menuMobile';

import useAnimatedRendering from 'hooks/useAnimatedRendering';

import { LINKS } from './constants';

import Link from '../Link';

const MobileNavigation: Component = () => {
	const {
		isRendered: isMenuVisible,
		isEntering: isMenuOpening,
		hideElement: closeMenu,
		showElement: openMenu,
	} = useAnimatedRendering({
		initialRenderState: false,
	});

	const menuClassNames = classNames(
		'fixed top-0 w-full bg-secondary-darker left-0 flex flex-col py-10 px-5 shadow-xl',
		{
			'animate-slide-down': isMenuOpening,
			'animate-slide-up': !isMenuOpening,
		}
	);

	React.useEffect(() => {
		MenuMobileEvents.closeMobileNavigation.setEvent(closeMenu);

		return () => {
			MenuMobileEvents.closeMobileNavigation.removeEvent();
		};
	}, []);

	return (
		<nav className='sm:hidden'>
			<button
				onClick={openMenu}
				className='w-10 h-10 rounded-md p-2 bg-secondary-menu'
			>
				<span className='bg-content-light h-[2px] w-full block'></span>
				<span className='bg-content-light h-[2px] w-full block mt-[6px]'></span>
				<span className='bg-content-light h-[2px] w-full block mt-[6px]'></span>
			</button>

			{isMenuVisible && (
				<div className={menuClassNames}>
					<button
						onClick={closeMenu}
						className='w-10 h-10 rounded-md p-2 bg-secondary-menu self-end flex items-center justify-center relative'
					>
						<span className='bg-content-light h-[2px] w-6 block rotate-[135deg] absolute'></span>
						<span className='bg-content-light h-[2px] w-6 block rotate-45 absolute'></span>
					</button>

					<ul className='flex flex-col items-center gap-2'>
						{LINKS.map(({ href, label }) => {
							const key = `link-item-${label.toLowerCase()}`;

							return (
								<li key={key}>
									<Link
										label={label}
										href={href}
										onClick={(event) => {
											closeMenu();
											handleScrollToSection(href)(event);
										}}
									/>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</nav>
	);
};

export default MobileNavigation;

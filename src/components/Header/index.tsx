'use client';
import React from 'react';

import Image from 'next/image';

import classNames from 'classnames';

import createDebounce from 'core/utils/debounce';
import MenuMobileEvents from 'core/utils/events/customEvents/menuMobile';

import useAnimatedRendering from 'hooks/useAnimatedRendering';

import { Navigation } from './Navigation';
import MobileMenu from './Navigation/components/MobileMenu';
import Link from 'next/link';

const FixedHeader: Component = () => {
	return (
		<header className='bg-transparent px-5 pt-10 flex items-center justify-between sm:px-8'>
			<Link href='/'>
				<Image
					className='w-12 sm:w-36'
					src='/images/logo-amarelo.png'
					alt='Sapataria do Elino'
					width={128}
					height={128}
					priority
				/>
			</Link>

			<Navigation />
		</header>
	);
};

const ScrollingHeader: Component = ({ className }) => {
	const scrollingHeaderClassNames = classNames(
		'bg-primary-main px-5 py-4 flex items-center justify-between fixed z-10 top-0 w-full shadow-xl sm:px-8',
		className
	);

	React.useEffect(() => {
		MenuMobileEvents.closeMobileNavigation.dispatchEvent();
	}, []);

	return (
		<header className={scrollingHeaderClassNames}>
			<Link href='/'>
				<Image
					className='w-12 sm:w-16'
					src='/images/logo-marrom.png'
					alt='Sapataria do Elino'
					width={64}
					height={64}
					priority
					role='presentation'
				/>
			</Link>

			<Navigation variant='secondary' />
		</header>
	);
};

const Header: Component = () => {
	const {
		isRendered: isScrollingHeaderRendered,
		isEntering: isScrollingHeaderEntering,
		hideElement: hideScrollingHeader,
		showElement: showScrollingHeader,
	} = useAnimatedRendering({
		initialRenderState: false,
		onHide: MenuMobileEvents.closeMobileNavigation.dispatchEvent,
	});

	const [debouncedHandleScroll, clearScrollDebounce] = createDebounce({
		callback: () => {
			const scrollTop = window.scrollY;
			const scrollThreshold = window.innerHeight / 4;

			if (scrollTop > scrollThreshold) {
				return showScrollingHeader();
			}

			hideScrollingHeader();
		},
		delay: 50,
		shouldAutoClear: true,
	});

	React.useEffect(() => {
		window.addEventListener('scroll', debouncedHandleScroll);

		return () => {
			clearScrollDebounce();
			window.removeEventListener('scroll', debouncedHandleScroll);
		};
	}, []);

	React.useEffect(() => {
		const SCROLL_THRESHOLD = 500;
		if (window.pageYOffset > SCROLL_THRESHOLD) showScrollingHeader();
	}, []);

	return (
		<>
			<MobileMenu />

			<FixedHeader />

			{isScrollingHeaderRendered && (
				<ScrollingHeader
					className={
						isScrollingHeaderEntering
							? 'animate-slide-down'
							: 'animate-slide-up'
					}
				/>
			)}
		</>
	);
};

export default Header;

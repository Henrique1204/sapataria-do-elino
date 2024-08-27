'use client';
import React from 'react';

import Image from 'next/image';

import classNames from 'classnames';

import createDebounce from 'core/utils/debounce';

import useAnimatedRendering from 'hooks/useAnimatedRendering';

import { Navigation } from './Navigation';

const FixedHeader: Component = () => {
	return (
		<header className='bg-transparent px-8 pt-10 flex items-center justify-between'>
			<Image
				className='w-36'
				src='/images/logo-amarelo.png'
				alt='Sapataria do Elino'
				width={128}
				height={128}
				priority
			/>

			<Navigation />
		</header>
	);
};

const ScrollingHeader: Component = ({ className }) => {
	const scrollingHeaderClassNames = classNames(
		'bg-primary-main px-8 py-4 flex items-center justify-between fixed z-10 top-0 w-full shadow-xl',
		className
	);

	return (
		<header className={scrollingHeaderClassNames}>
			<Image
				className='w-16'
				src='/images/logo-marrom.png'
				alt='Sapataria do Elino'
				width={64}
				height={64}
				priority
			/>

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

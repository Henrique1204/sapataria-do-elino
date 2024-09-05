'use client';

import MenuMobileEvents from 'core/utils/events/customEvents/menuMobile';

const MobileNavigation: Component = () => {
	return (
		<nav className='sm:hidden'>
			<button
				onClick={MenuMobileEvents.openMobileNavigation.dispatchEvent}
				className='w-10 h-10 rounded-md p-2 bg-secondary-menu'
			>
				<span className='bg-content-light h-[2px] w-full block'></span>
				<span className='bg-content-light h-[2px] w-full block mt-[6px]'></span>
				<span className='bg-content-light h-[2px] w-full block mt-[6px]'></span>
			</button>
		</nav>
	);
};

export default MobileNavigation;

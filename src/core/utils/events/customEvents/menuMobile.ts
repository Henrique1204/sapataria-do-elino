import CreateCustomEvent from './create';

class MenuMobileEvents {
	public static closeMobileNavigation: CreateCustomEvent =
		new CreateCustomEvent('@sapataria/menuMobile/closeMobileNavigation');

	public static openMobileNavigation: CreateCustomEvent = new CreateCustomEvent(
		'@sapataria/menuMobile/openMobileNavigation'
	);
}

export default MenuMobileEvents;

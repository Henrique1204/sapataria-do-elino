import CreateCustomEvent from 'core/utils/events/customEvents/create';

class MFEServiceEvents {
	public static onServiceStart: CreateCustomEvent = new CreateCustomEvent(
		'@sapataria/MFEService/onServiceStart'
	);
}

export default MFEServiceEvents;

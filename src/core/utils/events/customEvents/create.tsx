type IDetail<T> = { detail: T };

type cbEvent<T> = (detail: IDetail<T>) => void | Promise<void>;

class CreateCustomEvent<T = {}> {
	private cbEvent: cbEvent<T> | null = null;
	private eventName: string | null = null;

	constructor(eventName: string) {
		this.eventName = eventName;
	}

	public dispatchEvent = (data?: T) => {
		if (!this.eventName) return this;

		const event = new CustomEvent<T>(this.eventName, { detail: data });

		window.dispatchEvent(event);

		return this;
	};

	public setEvent = (cb: cbEvent<T>) => {
		if (!this.eventName) return this;

		this.cbEvent = cb;

		window.addEventListener<any>(this.eventName, cb);

		return this;
	};

	public removeEvent = () => {
		if (!this.cbEvent || !this.eventName) return this;

		window.removeEventListener<any>(this.eventName, this.cbEvent);

		return this;
	};
}

export default CreateCustomEvent;

'use client';

import { waitLoadSingleSPA, waitLoadSystemJs } from 'core/utils/loaderScript';

interface MFERoute {
	name: string;
	when: () => boolean;
	props?: Record<string, any>;
	to?: string;
	rendered: boolean;
}

class MFEService {
	private static singleSPA: any;

	public static async register(mfeName: string, route: string): Promise<void> {
		await waitLoadSystemJs();

		const singleSpa = await System.import('single-spa');

		const appStatus = singleSpa.getAppStatus(mfeName);

		if (appStatus !== null || appStatus === 'MOUNTED') return;

		singleSpa.registerApplication(
			mfeName,
			() => System.import(mfeName),
			(location: { pathname: string }) => {
				return location.pathname.startsWith(route);
			}
		);
	}

	public static async onStart(): Promise<void> {
		await waitLoadSingleSPA();

		this.singleSPA = await System.import('single-spa');

		await this.singleSPA.start({ urlRerouteOnly: true });
	}

	public static async onDestroy(): Promise<void> {}
}

export default MFEService;

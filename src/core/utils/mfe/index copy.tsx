'use client';

import { waitLoadSingleSPA } from 'core/utils/loaderScript';

interface MFERoute {
	name: string;
	when: () => boolean;
	props: Record<string, any>;
	to?: string;
	rendered: boolean;
}

class MFEService {
	private singleSPA: any;
	private mfeList: Map<string, MFERoute> = new Map();
	private loadedMFE: Record<string, any> = {};

	// Limpa os listeners ao destruir a instância
	public onDestroy(): void {
		window.removeEventListener(
			'single-spa:routing-event',
			this.handleRoutingEvent.bind(this)
		);
	}

	// Trata os eventos de roteamento
	private handleRoutingEvent(): void {
		const activeMFEApps = this.singleSPA.checkActivityFunctions();

		for (const mfe of activeMFEApps) {
			const mfeItem = this.mfeList.get(mfe);

			if (mfeItem && !mfeItem.rendered) {
				this.appendDom(mfe, mfeItem.to || 'main');
				mfeItem.rendered = true;
				this.mfeList.set(mfe, mfeItem);
			}
		}
	}

	// Adiciona o micro front-end no DOM
	private appendDom(mfeName: string, targetId: string): void {
		const targetElement = document.getElementById(targetId);
		const mfeElement = document.getElementById(
			`single-spa-application:${mfeName}`
		);

		if (targetElement && mfeElement) {
			targetElement.insertBefore(mfeElement, targetElement.firstChild);
		}
	}

	// Registra micro front-end de maneira lazy
	public lazyRegister(
		mfeName: string,
		params: Record<string, any> = {},
		activeWhen: () => boolean,
		targetElementId?: string
	): this {
		this.mfeList.set(mfeName, {
			name: mfeName,
			props: params,
			when: activeWhen,
			rendered: false,
			to: targetElementId,
		});

		return this;
	}

	// Registra um micro front-end no single-spa

	// Desregistra um micro front-end do single-spa
	public async unregister(mfeName: string): Promise<MFERoute | undefined> {
		await waitLoadSingleSPA();
		await this.singleSPA.unregisterApplication(mfeName);

		const mfeItem = this.mfeList.get(mfeName);
		if (mfeItem) {
			mfeItem.rendered = false;
			this.mfeList.set(mfeName, mfeItem);
		}

		return mfeItem;
	}

	// Atualiza as props de um micro front-end
	public async changeProps(
		mfeName: string,
		newProps: Record<string, any>
	): Promise<void> {
		const mfeItem = await this.unregister(mfeName);
		if (!mfeItem) return;

		mfeItem.props = newProps;
		this.mfeList.set(mfeName, mfeItem);

		await this.register(mfeName);
	}

	// Inicia o single-spa e registra os MFEs
	public async start(): Promise<void> {
		await waitLoadSingleSPA();

		this.singleSPA = await System.import('single-spa');

		// for (const mfe of this.mfeList.values()) {
		// 	await this.register(mfe.name);
		// }

		await this.singleSPA.start({ urlRerouteOnly: true });
	}

	// Verifica se um parcel está renderizado
	public isParcelRendered(mfeName: string): boolean {
		const mfe = this.mfeList.get(mfeName);
		if (!mfe || !mfe.rendered) return false;

		const activeMFEApps = this.singleSPA.checkActivityFunctions();
		return activeMFEApps.includes(mfeName);
	}

	// Função para logar o estado ativo de um MFE baseado no caminho
	public logActiveWhen(
		path: string,
		exact: boolean = false
	): (location: Location) => boolean {
		return (location: Location) => {
			const isDebugMode = JSON.parse(
				localStorage.getItem('MFE:activeWhenMFEDebug') || 'false'
			);
			const activeWhen = this.singleSPA.pathToActiveWhen(path, exact);
			const isActive = activeWhen(location);

			if (isDebugMode) {
				console.debug(`MFE: ${path} isActive:`, isActive);
			}

			return isActive;
		};
	}
}

export default MFEService;

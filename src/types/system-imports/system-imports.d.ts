import { CmsUtility } from './cms-utility';

declare global {
	type systemImportModel<Name, ReturnType> = (
		name: Name
	) => Promise<ReturnType>;

	type CmsUtilityImportFn = systemImportModel<
		'@henrique1204/cms-utility',
		CmsUtility
	>;

	type importFn = CmsUtilityImportFn;

	interface Window {
		System: {
			import: importFn;
		};
	}
}

import type { UseBoundStore, StoreApi } from 'zustand';

type ContentControl = {
	onReceiveValue: () => Promise<string>;
	onUpdateValue: (value: string) => Promise<void>;
};

type ContentField = {
	id: string;
	groupId: string;
	type: string;
	label: string;
	defaultValue: any;
} & ContentControl;

type ContentGroup = {
	id: string;
	title: string;
	fields: string[];
};

type CMSSchemaStore = {
	groups: ContentGroup[];
	fields: ContentField[];
};

type Store = {
	CMSSchemaStore: {
		useStore: UseBoundStore<StoreApi<CMSSchemaStore>>;
		reset: () => void;
	};
};

type UseCases = {
	CMSSchema: {
		createGroup: (newGroup: Omit<ContentGroup, 'fields'>) => void;
		addField: (newGroup: ContentField) => void;
	};
};

type Exceptions = {
	CMSSchemaStoreExceptions: {
		CMSSchemaStoreException: string;
		GroupAlreadyExistsException: string;
		FieldAlreadyExistsException: string;
		GroupNotFoundException: string;
		FieldNotFoundException: string;
	};
};

export type CmsUtility = {
	store: Store;
	useCases: UseCases;
	exceptions: Exceptions;
};

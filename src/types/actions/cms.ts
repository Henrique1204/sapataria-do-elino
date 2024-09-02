export type IntroductionData = {
	apresentation: string;
	depoyment: string;
	bannerSrc: string;
};

export type ContactData = {
	phones: string[];
	emails: string[];
	address: string;
	mapUrl: string;
};

export type PriceVariations = {
	price?: number;
	uponRequest?: boolean;
	fromOrPer?: boolean;
};

export type Service = PriceVariations & {
	id: number;
	name: string;
};

export type ServiceData = {
	id: number;
	itens: Service[];
	imageSrc: string;
	title: string;
};

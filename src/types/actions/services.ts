export type PriceVariations = {
	price?: number;
	uponRequest?: boolean;
	fromOrPer?: boolean;
};

export type Service = PriceVariations & {
	id: number;
	name: string;
};

export type ServicesByCategory = {
	category: string;
	services: Service[];
	imageSrc: string;
	title: string;
};

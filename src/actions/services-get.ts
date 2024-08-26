'use server';

import { Service, ServicesByCategory } from 'types/actions/services';

const servicesGet = async (): Promise<ServicesByCategory[]> => {
	const SHOES_SERVICES: Service[] = [
		{ id: 1, name: 'Engraxar Sapato', price: 10 },
		{ id: 2, name: 'Substituição de Salto Pequeno', price: 15 },
		{ id: 3, name: 'Substituição de Salto Médio', price: 20 },
		{ id: 4, name: 'Substituição de Salto Grande', price: 25 },
		{ id: 5, name: 'Substituição de Salto Masculino', price: 20 },
		{ id: 6, name: 'Troca de Sola Masculina', price: 120, fromOrPer: true },
		{ id: 7, name: 'Troca de Sola Feminina', price: 80, fromOrPer: true },
		{ id: 8, name: 'Costura e Reparos', uponRequest: true },
	];

	const BAG_SERVICES: Service[] = [
		{ id: 1, name: 'Conserto de Bags Motoboy', uponRequest: true },
		{ id: 2, name: 'Substituição de Forro', uponRequest: true },
		{ id: 3, name: 'Substituição de Zíper', uponRequest: true },
		{ id: 4, name: 'Troca de Rodas/Puxador', uponRequest: true },
		{ id: 5, name: 'Substituição de Puxador', uponRequest: true },
		{ id: 6, name: 'Restauração de Mala Quebrada', uponRequest: true },
		{ id: 7, name: 'Costura', uponRequest: true },
	];

	const LEATHER_SERVICES: Service[] = [
		{
			id: 1,
			name: 'Conserto de Itens',
			uponRequest: true,
		},
		{
			id: 2,
			name: 'Pintura de Itens',
			uponRequest: true,
		},
		{
			id: 3,
			name: 'Substituição de Estofado',
			uponRequest: true,
		},
	];

	return [
		{
			category: 'shoe',
			imageSrc: '/images/card-shoe.jpg',
			title: 'Sapatos',
			services: SHOES_SERVICES,
		},
		{
			category: 'bag',
			title: 'Bolsas e malas',
			imageSrc: '/images/card-bag.jpg',
			services: BAG_SERVICES,
		},
		{
			category: 'leather',
			title: 'Couros e Tecidos',
			imageSrc: '/images/card-leather.jpg',
			services: LEATHER_SERVICES,
		},
	];
};

export default servicesGet;

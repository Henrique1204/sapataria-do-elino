'use client';

import React from 'react';

import classNames from 'classnames';

import { formatMoney } from 'core/utils/formatters/money';

import Button from 'components/Button';

import * as Types from './types';

const Price: Component<Types.PriceProps> = ({
	price,
	uponRequest = false,
	fromOrPer = false,
}) => {
	if (uponRequest) return <span>Sob Consulta</span>;

	if (price !== undefined) {
		const formattedPrice = formatMoney(price);

		return (
			<span>
				{formattedPrice} {fromOrPer ? '(a partir / par)' : ''}
			</span>
		);
	}

	return null;
};

const ServicesList: Component<Types.ServiceListProps> = ({
	testId = 'service-list',
	services,
}) => {
	const MAX_VISIBLE_ITEMS = 4;
	const MIN_ITEMS_TO_HIDE_BUTTON = 7;
	const isExpandable = services.length >= MIN_ITEMS_TO_HIDE_BUTTON;

	const [isListExpanded, setIsListExpanded] = React.useState<boolean>(
		!isExpandable
	);

	const visibleItemsCount = isListExpanded
		? services.length
		: MAX_VISIBLE_ITEMS;

	const listClassNames = classNames(
		'flex flex-col gap-3 w-full h-fit transition-all',
		{
			'max-h-[500px]': isListExpanded,
			'overflow-hidden max-h-[230px]': !isListExpanded,
		}
	);

	const buttonClassNames = classNames('w-full', {
		'mt-8': isListExpanded,
		'mt-2': !isListExpanded,
	});

	const toggleListExpansion = () => {
		setIsListExpanded((prevState) => !prevState);
	};

	return (
		<>
			<ul className={listClassNames}>
				{services.map(({ id, name, price, fromOrPer, uponRequest }, index) => {
					const itemClassNames = classNames(
						'font-body text-base flex items-start justify-between items-start gap-3',
						{
							'opacity-15': index >= visibleItemsCount,
						}
					);

					return (
						<li key={`${testId}-item-${id}`} className={itemClassNames}>
							<span className='text-content-light text-start break-words'>
								{name}
							</span>

							<span className='text-content-main text-end text-nowrap'>
								<Price
									price={price}
									fromOrPer={fromOrPer}
									uponRequest={uponRequest}
								/>
							</span>
						</li>
					);
				})}
			</ul>

			{isExpandable && (
				<Button onClick={toggleListExpansion} className={buttonClassNames}>
					{isListExpanded ? 'Ver menos' : 'Ver mais'}
				</Button>
			)}
		</>
	);
};

export default ServicesList;

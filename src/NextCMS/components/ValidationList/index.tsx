'use client';

import React from 'react';

import classNames from 'classnames';

import * as Types from './types';

import Icon from '../Icon';
import Tooltip from '../Tooltip';
import Show from '../Show';

const IconCircle: Component<Types.IconCircleProps> = ({
	isEmpty,
	isInvlaid,
}) => {
	const containerClassname = classNames(
		'border-[1.5px] border-solid mr-3 flex items-center justify-center rounded-full w-5 h-5 p-1',
		isInvlaid
			? 'border-red-500 bg-red-500 p-[2px]'
			: 'border-green-500 bg-green-500',
		{ '!border-cms-gray !bg-cms-gray': isEmpty }
	);

	return (
		<div className={containerClassname}>
			{!isEmpty && (
				<Icon name={isInvlaid ? 'Close' : 'Check'} className='text-white' />
			)}
		</div>
	);
};

const ValidationList: Component<Types.ValidationsListProps> = ({
	testId = 'validation-list',
	validations,
	value,
	className = '',
}) => {
	const [isVisibleTooltip, setIsVisibleTooltip] =
		React.useState<boolean>(false);

	return (
		<ul data-testid={testId} className={`flex flex-col gap-2 ${className}`}>
			{validations.map(({ message, validation, example }, index) => {
				const id = `validation-list-item-${index}`;
				const isEmpty = value === '';
				const isInvalid = validation(value);

				return (
					<li data-testid={id} key={id} className='flex items-center'>
						<IconCircle isEmpty={isEmpty} isInvlaid={isInvalid} />

						{message}

						<Show isShowing={Boolean(example)}>
							<Tooltip.Root
								isVisibleTooltip={isVisibleTooltip}
								setIsVisibleTooltip={setIsVisibleTooltip}
							>
								<Tooltip.TooltipContent className='whitespace-nowrap'>
									{example}
								</Tooltip.TooltipContent>
							</Tooltip.Root>
						</Show>
					</li>
				);
			})}
		</ul>
	);
};

export type { ValidationItem } from './types';

export default ValidationList;

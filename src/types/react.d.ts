import React from 'react';

declare global {
	export type DefaultProps = {
		testId?: string;
		className?: string;
	};

	export interface Component<T = {}> extends React.FC<DefaultProps & T> {}

	export interface ComponentWithChildren<T = {}>
		extends React.FC<DefaultProps & { children?: React.ReactNode } & T> {}
}

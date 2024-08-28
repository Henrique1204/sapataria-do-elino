import React from 'react';

export type TitleProps = {
	content: string;
};

export type InfoCustomProps = {
	content: string;
	as?: 'a' | 'p';
};

export type AcnchorInfoProps = InfoCustomProps &
	React.HTMLProps<HTMLAnchorElement> & {
		as: 'a';
	};

export type ParagraphInfoProps = InfoCustomProps &
	React.HTMLProps<HTMLParagraphElement> & {
		as?: 'p';
	};

export type InfoProps = AcnchorInfoProps | ParagraphInfoProps;

'use server';

import { connectDB } from '../connection';
import User, { IUser } from '../models/User';

import { emailSchema } from '../../core/utils/validations/userSchemas';

export const getUserByEmail = async (email: string): Promise<IUser> => {
	const parsed = emailSchema.safeParse(email);

	if (!parsed.success) throw new Error('E-mail inválido');

	const emailParsed = parsed.data;

	await connectDB();

	return (await User.findOne({ email: emailParsed })) as IUser;
};

export const updateUserAccountStatusToActiveByEmail = async (
	email: string
): Promise<void> => {
	const parsed = emailSchema.safeParse(email);

	if (!parsed.success) throw new Error('E-mail inválido');

	const emailParsed = parsed.data;

	await connectDB();

	await User.updateOne({ email: emailParsed }, { isActived: true });
};

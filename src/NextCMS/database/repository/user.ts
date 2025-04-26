'use server';

import bcrypt from 'bcryptjs';

import { connectDB } from '../connection';
import User, { IUser } from '../models/User';

import { emailSchema } from '../../core/utils/validations/schemas/userSchemas';

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

export const changeUserPasswordByEmail = async ({
	email,
	newPassword,
}: {
	email: string;
	newPassword: string;
}): Promise<void> => {
	const parsed = emailSchema.safeParse(email);

	if (!parsed.success) throw new Error('E-mail inválido');

	const emailParsed = parsed.data;

	await connectDB();

	const SALT_ROUNDS = 10;
	const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

	await User.updateOne({ email: emailParsed }, { password: hashedPassword });
};

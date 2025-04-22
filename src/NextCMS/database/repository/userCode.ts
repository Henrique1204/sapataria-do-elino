'use server';

import {
	userCodeSchema,
	userIdSchema,
} from '../../core/utils/validations/userCodeSchemas';

import { emailSchema } from '../../core/utils/validations/userSchemas';

import { connectDB } from '../connection';

import { IUser } from '../models/User';
import UserCode, { IUserCode } from '../models/UserCode';

import { getUserByEmail } from '../repository/user';

export const getUserCodeByUserId = async (
	userId: IUser['_id']
): Promise<IUserCode> => {
	const parsed = userIdSchema.safeParse(userId);

	if (!parsed.success) throw new Error('Id inválido');

	const userIdParsed = parsed.data;

	await connectDB();

	return (await UserCode.findOne({ userId: userIdParsed })) as IUserCode;
};

export const deleteUserCodeByUserId = async (
	userId: IUser['_id']
): Promise<void> => {
	const userIdParsed = userIdSchema.safeParse(userId);

	if (!userIdParsed.success) throw new Error('Id inválido');

	await connectDB();

	await UserCode.deleteOne({ userId: userIdParsed.data });
};

export const createUserCodeByUserEmail = async (
	userEmail: IUser['email'],
	userCodeInfos: Pick<IUserCode, 'code' | 'expirationDate'>
): Promise<void> => {
	const userEmailParsed = emailSchema.safeParse(userEmail);
	const parsed = userCodeSchema.safeParse(userCodeInfos);

	if (!parsed.success || !userEmailParsed.success) {
		throw new Error('Informações inválidas');
	}

	const user = await getUserByEmail(userEmailParsed.data);

	if (!user) throw new Error('Usuário não encontrado');

	const { code, expirationDate } = parsed.data;

	await connectDB();

	try {
		await UserCode.create({ userId: user._id, code, expirationDate });
	} catch (error: any) {
		const MONGODB_DUPLICATE_KEY_ERROR_CODE = 11000;

		if (error.code === MONGODB_DUPLICATE_KEY_ERROR_CODE) {
			await UserCode.findOneAndUpdate(
				{ userId: user._id },
				{ code, expirationDate },
				{ upsert: true }
			);
		} else {
			throw error;
		}
	}
};

export const updateUserCodeByUserEmail = async (
	userEmail: IUser['email'],
	userCodeInfos: Pick<IUserCode, 'code' | 'expirationDate'>
): Promise<void> => {
	const userEmailParsed = emailSchema.safeParse(userEmail);
	const parsed = userCodeSchema.safeParse(userCodeInfos);

	if (!parsed.success || !userEmailParsed.success) {
		throw new Error('Informações inválidas');
	}

	const user = await getUserByEmail(userEmailParsed.data);

	if (!user) throw new Error('Usuário não encontrado');

	const { code, expirationDate } = parsed.data;

	await connectDB();

	await UserCode.updateOne({ userId: user._id }, { code, expirationDate });
};

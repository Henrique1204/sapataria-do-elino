import { getUserByEmail } from '../../../database/repository/user';
import type { IUser } from '../../../database/models/User';

import APIException from '../../exepctions/api';

const MSG_NOT_FOUND = 'Usuário não encontrado';

const MSG_NOT_ACTIVED = `
  Você não pode trocar a senha antes de validar o e-mail.<br/>
  Caso tenha problemas consulte o administrador do site.
`;

export const getActiveUserByEmail = async (email: string): Promise<IUser> => {
	const user = await getUserByEmail(email);
	if (!user) {
		throw new APIException(MSG_NOT_FOUND, 404);
	}
	if (!user.isActived) {
		throw new APIException(MSG_NOT_ACTIVED, 404);
	}
	return user;
};

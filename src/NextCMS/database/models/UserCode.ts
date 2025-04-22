import mongoose from 'mongoose';

export interface IUserCode {
	_id: string;
	userId: string;
	code: string;
	expirationDate: number;
}

const UserCodeSchema = new mongoose.Schema({
	userId: { type: String, required: true, unique: true },
	code: { type: String, required: true },
	expirationDate: { type: Number },
});

const UserCode =
	mongoose.models.UserCode ||
	mongoose.model('UserCode', UserCodeSchema, 'userCodes');

export default UserCode;

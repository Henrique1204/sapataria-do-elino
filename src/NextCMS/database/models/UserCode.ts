import mongoose, { Schema, Document } from 'mongoose';

export interface IUserCode extends Document {
	userId: mongoose.Types.ObjectId;
	code: string;
	expirationDate: Date;
}

const UserCodeSchema = new Schema<IUserCode>({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		unique: true,
	},
	code: { type: String, required: true },
	expirationDate: {
		type: Date,
		required: true,
		expires: 0,
		index: {
			expireAfterSeconds: 1,
		},
	},
});

const UserCode =
	mongoose.models.UserCode ||
	mongoose.model<IUserCode>('UserCode', UserCodeSchema, 'userCodes');

export default UserCode;

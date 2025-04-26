import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
	_id: mongoose.Types.ObjectId;
	email: string;
	password: string;
	isActived: boolean;
	role: 'admin' | 'editor' | 'visit';
}

const UserSchema = new Schema<IUser>({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	isActived: { type: Boolean },
	role: { type: String },
});

const User =
	mongoose.models.User || mongoose.model('User', UserSchema, 'users');

export default User;

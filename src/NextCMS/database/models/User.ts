import mongoose from 'mongoose';
import { string } from 'zod';

export interface IUser {
	_id: string;
	email: string;
	password: string;
	isActived: boolean;
	role: 'admin' | 'editor' | 'visit';
}

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	isActived: { type: Boolean },
	role: { type: String },
});

const User =
	mongoose.models.User || mongoose.model('User', UserSchema, 'users');

export default User;

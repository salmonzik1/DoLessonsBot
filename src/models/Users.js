import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	id: { type: Number, index: true, unique: true },
});

export const Users = model('Users', UserSchema);
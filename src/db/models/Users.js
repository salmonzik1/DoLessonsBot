import { Schema, model } from '#root/db/mongoose.js';

const UserSchema = new Schema({
    id: { type: Number, index: true, unique: true },
});

export const Users = model('Users', UserSchema);

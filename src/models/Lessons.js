import { Schema, model } from 'mongoose';

const lessonsSchema = new Schema({
	userId: Number,
	lessons: Map,
});

export const Lessons = model('lessons', lessonsSchema);
	
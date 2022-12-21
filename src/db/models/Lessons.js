import { Schema, model } from './../mongoose.js';

const lessonsSchema = new Schema({
	userId: Number,
	lessons: {
		type: Map,
		default: () => new Map(),
	}
});

export const Lessons = model('lessons', lessonsSchema);
	
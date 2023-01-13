import { Schema, model } from '#root/db/mongoose.js';

const lessonsSchema = new Schema({
    userId: Number,
    lessons: {
        type: Map,
        default: () => new Map(),
    },
});

export const Lessons = model('lessons', lessonsSchema);

import { Schema, model } from './../mongoose.js';

const ScheduleSchema = new Schema({
    userId: Number,
    /**
     * 0 - Воскресенье 4 - Четверг
     * 1 - Понедельник 5 - Пятница
     * 2 - Вторник     6 - Суббота
     * 3 - Среда       * - *******
     */
    dayId: {
        type: Number,
        default: () => new Date().getDay(),
    },
    lessons: {
        type: [String],
        default: [],
    },
});

export const Schedules = model('Schedules', ScheduleSchema);

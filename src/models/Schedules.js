import { Schema, model } from 'mongoose';

const ScheduleSchema = new Schema({
	userId: Number,
	/**
	 * 0 - Воскресенье 4 - Четверг
	 * 1 - Понедельник 5 - Пятница
	 * 2 - Вторник     6 - Суббота
	 * 3 - Среда       * - *******
	 */
	dayId: Number,
	lessons: [String],
});

export const Schedules = model('Schedules', ScheduleSchema);	
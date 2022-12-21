import { Composer  } from 'grammy';
import { createConversation } from '@grammyjs/conversations';

import { keyboard as setScheduleKeyboard } from './../keyboards/set-schedule.keyboard.js';
import { keyboard as menuKeyboard } from './../keyboards/menu.keyboard.js';
import { keyboard as backKeyboard } from './../keyboards/back.keyboard.js';

import { Schedules } from './../../db/models/Schedules.js'

export const composer = new Composer();

const feature = composer.chatType('private');

feature.hears(/📝 Расписание|\/setschedule/i, async (ctx) => {
	await ctx.reply('[📓] Выберите день для которого хотите указать расписание.', {
		reply_markup: setScheduleKeyboard,
	});
});

feature.callbackQuery(/setschedule-call/i, async (ctx) => {
	await ctx.editMessageText('[📓] Выберите день для которого хотите указать расписание.', {
		reply_markup: setScheduleKeyboard,
	});
});

function normalizeDay(dayName) {
	const days = { 'воскресенье': 0, 'понедельник': 1, 'вторник': 2, 'среда': 3, 'четверг': 4, 'пятница': 5, 'суббота': 6 };

	return days[dayName];
};

const setScheduleConversation = async (conv, ctx) => {
	const dayName = ctx.match[0].split('-')[1];

	await ctx.reply(
		`[⚒] Укажите расписание для <b>${dayName}</b>.`,
		{ reply_markup: backKeyboard }
	);
	
	const { msg } = await conv.waitFor('message:text');

	if (msg.text === '↪️ Назад') {
		return await ctx.reply(
			`[❌] Отмена указывания расписания для <b>${dayName}</b>.`, {
			reply_markup: menuKeyboard,
		});
	}

	await conv.external(async () => {
		let schedule = await Schedules.findOrCreate({ userId: ctx.from.id, dayId: normalizeDay(dayName) });

		schedule.lessons = [];

		for (let lesson of msg.text.split('\n')) {
			schedule.lessons.push(lesson.toLowerCase());
		}

		await schedule.save();
	});

	return await ctx.reply(
		`[🎓] Вы указали расписание для <b>${dayName}</b>: <code>${msg.text}</code>`, {
		reply_markup: menuKeyboard,
	});
};
feature.use(createConversation(setScheduleConversation));

feature.callbackQuery(/setschedule-.*/i, async (ctx) => {
	ctx.answerCallbackQuery();
	await ctx.conversation.enter('setScheduleConversation');
});
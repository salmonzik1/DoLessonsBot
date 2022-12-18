import { Composer  } from 'grammy';
import { createConversation } from '@grammyjs/conversations';

import { keyboard as setScheduleKeyboard } from './../keyboards/set-schedule.keyboard.js';
import { keyboard as menuKeyboard } from './../keyboards/menu.keyboard.js';
import { keyboard as backKeyboard } from './../keyboards/back.keyboard.js';

import { Users } from './../../database.js'

export const composer = new Composer();

const feature = composer.chatType('private');

feature.hears(/📝 Расписание|\/setschedule/i, async (ctx) => {
	ctx.reply('[📓] Выберите день для которого хотите указать расписание.', {
		reply_markup: setScheduleKeyboard,
	});
});

feature.callbackQuery(/setschedule-call/i, async (ctx) => {
	await ctx.editMessageText('[📓] Выберите день для которого хотите указать расписание.', {
		reply_markup: setScheduleKeyboard,
	});
});

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

	await conversation.external(async () => {
		(await Users.findUser(ctx.from.id)).setSchedule(ctx.match[0].toLowerCase(), msg.text.replace(/\n/gi, ';').toLowerCase());
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
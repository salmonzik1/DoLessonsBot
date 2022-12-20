import { Composer } from 'grammy';

import { keyboard as menuKeyboard } from './../keyboards/menu.keyboard.js';

import { Users } from './../../database.js';

export const composer = new Composer();

const feature = composer.chatType('private');

feature.hears(/🎮 Меню|\/menu|\/start/, async ctx => {
	await ctx.reply('[🎨] Выберите команду из меню.', { reply_markup: menuKeyboard });
});

function tableSchedule(schedules) {
	const delta = 18; // 
	let text = '<code>';

	for (let schedule of schedules) {
		text += '┌' + '─'.repeat(delta-2) + '┐' + '\n';
		text += '|' + schedule.dayId + ' '.repeat(delta-schedule.dayId.length-2) + '|' + '\n';
		text += '├' + '─'.repeat(delta-2) + '┤' + '\n';

		for (let lesson of schedule.value?.split(';')||[]) {
			text += '│' + lesson + ' '.repeat(delta-lesson.length-2) + '|' + '\n';
		}

		text += '└' + '─'.repeat(delta-2) + '┘' + '\n';
	}

	return text+'</code>';
}

feature.hears(/📚 Всё расписание|\/getschedule/, async ctx => {
	const schedules = await (await Users.findUser(ctx.from.id)).getSchedules();

	ctx.reply(tableSchedule(schedules));
});

feature.hears(/📁 Д\/З|\/getlessons/, async ctx => {
	const lessons = await (await Users.findUser(ctx.from.id)).getLessons();
	const text = lessons.map(el => `${el.lessonId[0].toUpperCased()+el.lessonId.slice(1)}: ${el.value}`).join('\n');
	await ctx.reply(`[🧩] Вот ваше Д/З на завтра:\n<code>${text}</code>`);
});
import { Composer } from 'grammy';

import { Schedules } from '#root/db/models/Schedules.js';
import { daysList, id2dayName } from '#bot/helpers/days-list.js';

import { setScheduleKeyboard } from './keyboards.js';
import { setScheduleConversation } from './conversations.js';

export const feature = new Composer().chatType('private');

feature.hears(/📝 Расписание|\/setschedule/gi, async (ctx) => {
    await ctx.reply(
        '[📓] Выберите день для которого хотите указать расписание.',
        {
            reply_markup: setScheduleKeyboard,
        }
    );
});

feature.use(setScheduleConversation);

feature.hears(
    new RegExp(daysList.join('|'), 'gi'),
    async (ctx) => await ctx.conversation.enter('setScheduleConversation')
);

feature.hears(/📚 Всё расписание|\/getschedule/, async (ctx) => {
    const schedules = await Schedules.find({ userId: ctx.from.id });

    await ctx.reply(tableSchedule(schedules));
});

/**
 * Я НЕ ЕБУ КАК ЭТО РАБОТАЕТ
 * НО ПОМНЮ ЧТО РАБОТАЕТ ЧЕРЕЗ ЖОПУ
 * НАДО ПОЧИНИТЬ
 * TO DO
 */
function tableSchedule(schedules) {
    const delta = 18;
    let text = '<code>';

    for (let schedule of schedules) {
        text += '┌' + '─'.repeat(delta - 2) + '┐' + '\n';
        text +=
            '|' +
            id2dayName(schedule.dayId) +
            ' '.repeat(delta - id2dayName(schedule.dayId).length - 2) +
            '|' +
            '\n';
        text += '├' + '─'.repeat(delta - 2) + '┤' + '\n';

        for (let lesson of schedule.lessons) {
            text +=
                '│' +
                lesson +
                ' '.repeat(delta - lesson.length - 2) +
                '|' +
                '\n';
        }

        text += '└' + '─'.repeat(delta - 2) + '┘' + '\n';
    }

    return text + '</code>';
}

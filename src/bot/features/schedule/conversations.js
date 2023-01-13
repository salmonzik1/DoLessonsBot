import { createConversation } from '@grammyjs/conversations';

import { Schedules } from './../../../db/models/Schedules.js';
import { dayName2id } from './../../helpers/days-list.js';

import { keyboard as menuKeyboard } from './../../keyboards/menu.keyboard.js';
import { keyboard as backKeyboard } from './../../keyboards/back.keyboard.js';

export let setScheduleConversation = async (conv, ctx) => {
    const dayName = ctx.match[0];

    await ctx.reply(`[⚒] Укажите расписание для <b>${dayName}</b>.`, {
        reply_markup: backKeyboard,
    });

    const { msg } = await conv.waitFor('message:text');

    if (msg.text === '↪️ Назад') {
        return await ctx.reply(
            `[❌] Отмена указывания расписания для <b>${dayName}</b>.`,
            {
                reply_markup: menuKeyboard,
            }
        );
    }

    await conv.external(async () => {
        let schedule = await Schedules.findOrCreate({
            userId: ctx.from.id,
            dayId: dayName2Id(dayName.toLowerCase()),
        });

        schedule.lessons = [];

        for (let lesson of msg.text.split('\n')) {
            schedule.lessons.push(lesson.toLowerCase());
        }

        await schedule.save();
    });

    return await ctx.reply(
        `[🎓] Вы указали расписание для <b>${dayName}</b>: <code>${msg.text}</code>`,
        {
            reply_markup: menuKeyboard,
        }
    );
};

setScheduleConversation = createConversation(setScheduleConversation);

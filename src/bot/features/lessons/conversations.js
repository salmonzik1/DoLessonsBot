import { createConversation } from '@grammyjs/conversations';

import { keyboard as backKeyboard } from './../../keyboards/back.keyboard.js';
import { keyboard as menuKeyboard } from './../../keyboards/menu.keyboard.js';

import { Lessons } from './../../../db/models/Lessons.js';

export let setLessonsConversation = async (conv, ctx) => {
    const lessonName = ctx.match[0];

    await ctx.reply(`[⚒] Укажите Д/З для <b>${lessonName}</b>.`, {
        reply_markup: backKeyboard,
    });

    const { msg } = await conv.waitFor('message:text');

    if (msg.text === '↪️ Назад') {
        return await ctx.reply(
            `[❌] Отмена указывания Д/З для <b>${lessonName}</b>.`,
            {
                reply_markup: menuKeyboard,
            }
        );
    }

    await conv.external(async () => {
        let schedule = await Lessons.findOrCreate({ userId: ctx.from.id });

        schedule.lessons.set(lessonName.toLowerCase(), msg.text);

        schedule.save();
    });

    return await ctx.reply(
        `[🎓] Вы указали Д/З для <b>${lessonName}</b>: <code>${msg.text}</code>`,
        {
            reply_markup: menuKeyboard,
        }
    );
};

setLessonsConversation = createConversation(setLessonsConversation);

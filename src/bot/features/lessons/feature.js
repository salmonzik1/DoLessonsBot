import { Composer } from 'grammy';

import { Lessons } from '#root/db/models/Lessons.js';
import { Schedules } from '#root/db/models/Schedules.js';
import { lessonsList } from '#bot/helpers/lessons-list.js';

import { lessonsKeyboard } from './keyboards.js';
import { setLessonsConversation } from './conversations.js';

export const feature = new Composer().chatType('private');

feature.hears(/📔 Уроки|\/setlessons/i, async (ctx) => {
    await ctx.reply('[📓] Выберите урок для которого хотите указать Д/3.', {
        reply_markup: lessonsKeyboard,
    });
});

feature.use(setLessonsConversation);

feature.hears(
    new RegExp(lessonsList.join('|'), 'gi'),
    async (ctx) => await ctx.conversation.enter('setLessonsConversation')
);

feature.hears(/📁 Д\/З|\/getlessons/, async (ctx) => {
    const tomorrowDay = new Date().getDay() + 1;
    const dayId = tomorrowDay !== 0 && tomorrowDay !== 6 ? tomorrowDay : 1;

    let schedule = await Schedules.findOrCreate({
        userId: ctx.from.id,
        dayId: tomorrowDay,
    });

    let lessons = await Lessons.findOrCreate({ userId: ctx.from.id });

    const tomorrowLessons = schedule.lessons
        .map((el) => {
            const lesson = lessons.lessons.get(el);

            return `${el[0].toUpperCase() + el.slice(1)}: ${lesson}`;
        })
        .join('\n');

    await ctx.reply(
        `[🧩] Вот ваше Д/З на завтра:\n<code>${tomorrowLessons}</code>`
    );
});

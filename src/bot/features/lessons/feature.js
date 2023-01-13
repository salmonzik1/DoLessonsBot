import { Composer } from 'grammy';

import { lessonsList } from './../../helpers/lessons-list.js';

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

import { Composer } from 'grammy';

import { keyboard as menuKeyboard } from '#bot/keyboards/menu.keyboard.js';

export const feature = new Composer().chatType('private');

feature.command('start', async (ctx) => {
    await Users.findOrCreate({ id: ctx.from.id });

    await ctx.reply('[🎨] Выберите команду из меню.', {
        reply_markup: menuKeyboard,
    });
});

feature.hears(/🎮 Меню|\/menu/, async (ctx) => {
    await ctx.reply('[🎨] Выберите команду из меню.', {
        reply_markup: menuKeyboard,
    });
});

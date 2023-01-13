import { Composer } from 'grammy';

import { keyboard as profileKeyboard } from './../../keyboards/profile.keyboard.js';
import { keyboard as settingsKeyboard } from './../../keyboards/settings.keyboard.js';

export const feature = new Composer().chatType('private');

feature.hears(/👤 Профиль|\/profile/i, async (ctx) => {
    await ctx.reply(
        `
		[👤] Профиль пользователя <code>${
            ctx.from.username || ctx.from.firstName
        }</code>
		`,
        {
            reply_markup: profileKeyboard,
        }
    );
});

feature.callbackQuery(/profile-settings/i, async (ctx) => {
    await ctx.editMessageText('b', {
        reply_markup: settingsKeyboard,
    });
});

feature.callbackQuery(/profile-back/i, async (ctx) => {
    await ctx.editMessageText(
        `
		[👤] Профиль пользователя <code>${
            ctx.from.username || ctx.from.firstName
        }</code>
		`,
        {
            reply_markup: profileKeyboard,
        }
    );
});

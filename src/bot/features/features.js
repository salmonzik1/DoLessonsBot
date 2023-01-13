import { Composer } from 'grammy';

import { keyboard as menuKeyboard } from '#bot/keyboards/menu.keyboard.js';

import { feature as lessonsFeature } from './lessons/feature.js';
import { feature as scheduleFeature } from './schedule/feature.js';
import { feature as otherFeature } from './other/feature.js';

export const features = new Composer();

features.use(scheduleFeature);
features.use(lessonsFeature);
features.use(otherFeature);

features.hears(/↪️ Назад/gi, async (ctx) => {
    await ctx.reply('[🎨] Выберите команду из меню.', {
        reply_markup: menuKeyboard,
    });
});

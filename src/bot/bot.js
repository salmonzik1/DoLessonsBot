import { Bot, session } from 'grammy';
import { limit as rateLimit } from '@grammyjs/ratelimiter';
import { apiThrottler } from '@grammyjs/transformer-throttler';
import { hydrateReply, parseMode } from '@grammyjs/parse-mode';
import { conversations } from '@grammyjs/conversations';

import { config } from './../config.js';

import { features } from './features/features.js';

import { handleError } from './helpers/handle-error.js';

export const bot = new Bot(config.BOT_TOKEN);

/********************************
 *           Middlewares         *
 ********************************/
bot.api.config.use(apiThrottler());
bot.api.config.use(parseMode('HTML'));

bot.use(hydrateReply);
bot.use(rateLimit());

const commandsList = [
    { command: 'menu', description: 'Отображение меню' },
    { command: 'profile', description: 'Вызов профиля с настройками' },
    { command: 'setlessons', description: 'Записывание Д/3' },
    { command: 'getlessons', description: 'Получение Д/З' },
    { command: 'setschedule', description: 'Установка расписания' },
    { command: 'getschedule', description: 'Получение полного расписания' },
];

bot.api.setMyCommands(commandsList);

bot.use(
    session({
        initial: () => ({}),
    })
);
bot.use(conversations());

/********************************
 *            Handlers           *
 ********************************/
bot.use(features);

if (config.isDev) {
    bot.catch(handleError);
}

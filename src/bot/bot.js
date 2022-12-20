import { Bot } from 'grammy';
import { limit as rateLimit } from '@grammyjs/ratelimiter';
import { apiThrottler } from '@grammyjs/transformer-throttler';
import { hydrateReply, parseMode } from '@grammyjs/parse-mode';
import { session } from 'grammy';
import { conversations } from '@grammyjs/conversations';

import { config } from './../config.js';

import { composer as lessonsFeature } from './features/set-lessons.feature.js';
import { composer as scheduleFeature } from './features/set-schedule.feature.js';
import { composer as menuFeature } from './features/menuHandler.feature.js';
import { composer as profileFeature } from './features/profile.feature.js';

import { Users } from './../models/Users.js';

import { handleError } from './helpers/handleError.js';

export const bot = new Bot(config.BOT_TOKEN);

/********************************
*           Middlewares         *
********************************/
bot.api.config.use(apiThrottler());
bot.api.config.use(parseMode("HTML"));

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

bot.use(session({
	initial() { return {}; }
}));
bot.use(conversations());

/********************************
*            Handlers           *
********************************/
bot.use(menuFeature);
bot.use(scheduleFeature);
bot.use(lessonsFeature);
bot.use(profileFeature);

if (config.isDev) {
	bot.catch(handleError);
}
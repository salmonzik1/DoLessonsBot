import { Bot } from 'grammy';
import { limit as rateLimit } from '@grammyjs/ratelimiter';
import { apiThrottler } from '@grammyjs/transformer-throttler';
import { hydrateReply, parseMode } from '@grammyjs/parse-mode';
import { session } from 'grammy';
import { conversations } from '@grammyjs/conversations';

import { config } from './../config.js';

import { composer as menuFeature } from './features/menu.feature.js';
import { composer as lessonsFeature } from './features/lessons.feature.js';
import { composer as scheduleFeature } from './features/schedule.feature.js';
import { composer as gettersFeature } from './features/getters.feature.js';
import { composer as settersFeature } from './features/setters.feature.js';
import { handleError } from './helpers/handleError.js';

export const bot = new Bot(config.BOT_TOKEN);

/********************************
*           Middlewares         *
********************************/
bot.api.config.use(apiThrottler());
bot.api.config.use(parseMode("HTML"));

bot.use(hydrateReply);
bot.use(rateLimit());

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
bot.use(gettersFeature);
bot.use(settersFeature);

if (config.isDev) {
	bot.catch(handleError);
}
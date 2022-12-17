import localtunnel from 'localtunnel';

import { bot } from './bot/bot.js';
import { server } from './server/server.js';
import {} from './database.js';
import { config } from './config.js';
import { logger } from './logger.js';

const main = async () => {
	if (!config.isDev) {
		return server.listen({
			host: config.BOT_SERVER_HOST,
			port: config.BOT_SERVER_PORT,
		}, async (err) => {
			if (err) return logger.error(err);

			const tunnel = await localtunnel({
				local_host: config.BOT_SERVER_HOST,
				port: config.BOT_SERVER_PORT,
			});

			logger.info(tunnel.url)

			bot.api.setWebhook(`${tunnel.url}/${config.BOT_TOKEN}`, {
				allowed_updates: config.BOT_ALLOWED_UPDATES,
			}).catch((err) => logger.error(err));
		});
	}

	bot.start({
		allowed_updates: config.BOT_ALLOWED_UPDATES,
		onStart: ({ username }) => {
			logger.info({
				msg: 'Bot is running...',
				username,
			});
		},
	});
};

main();
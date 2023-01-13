import localtunnel from 'localtunnel';

import { config } from '#root/config.js';
import { logger } from '#root/logger.js';

export let BOT_SERVER_HOST = config.BOT_SERVER_HOST;

if (!config.isDev) {
    BOT_SERVER_HOST = (
        await localtunnel({
            local_host: '127.0.0.1',
            port: config.BOT_SERVER_PORT,
        })
    ).url;

    logger.info(BOT_SERVER_HOST);
}

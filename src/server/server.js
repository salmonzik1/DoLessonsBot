import fastify from 'fastify';
import { BotError, webhookCallback } from 'grammy';

import { bot } from '#bot/bot.js';
import { config } from '#root/config.js';
import { logger } from '#root/logger.js';
import { handleError } from '#bot/helpers/handle-error.js';

export const server = fastify({
    logger,
});

server.setErrorHandler(async (err, req, res) => {
    if (err instanceof BotError) {
        await handleError(err);

        res.code(200).send({});
    } else {
        logger.error(err);

        res.status(500).send({ error: 'Что-то пошло не так' });
    }
});

server.post(`/${config.BOT_TOKEN}`, webhookCallback(bot, 'fastify'));

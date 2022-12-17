import pino from 'pino';
import pretty from 'pino-pretty';

import { config } from './config.js';
import { Context } from 'grammy'
;
const options = {
	level: config.LOG_LEVEL,
};

export let rawLogger = pino(options);

if (config.isDev) {
 	rawLogger = pino(
		options,
		pretty({
			ignore: "pid,hostname",
			colorize: true,
			translateTime: true,
		})
	);
}

export const logger = new Proxy(rawLogger, {
	get(target, property, receiver) {
		target = Context.getStore?.()?.logger || target;

		return Reflect.get(target, property, receiver);
	},
});
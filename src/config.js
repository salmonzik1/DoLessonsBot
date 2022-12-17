import * as dotenv from 'dotenv';
import { cleanEnv, str, json } from 'envalid';

import { resolve } from 'path';
import { cwd } from 'process';

dotenv.config({ path: resolve(cwd(), '.env') });

export const config = cleanEnv(process.env, {
	NODE_ENV: str({ 
		choices: ['development', 'production']
	}),
	LOG_LEVEL: str({
		choices: ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'],
	}),
	BOT_SERVER_HOST: str({
		default: '127.0.0.1',
	}),
	BOT_SERVER_PORT: str({
		default: 3000,
	}),
	BOT_ALLOWED_UPDATES: json({
		default: [],
	}),
	BOT_TOKEN: str(),
});
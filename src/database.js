import mongoose, { connect } from 'mongoose';

import { config } from './config.js';
import { logger } from './logger.js'

export const runMongo = async () => {
	mongoose.set("strictQuery", false);

	return connect(config.MONGO_URL);
}


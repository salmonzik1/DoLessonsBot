import mongoose, { connect } from 'mongoose';

import { config } from '#root/config.js';
import { logger } from '#root/logger.js';

export const runMongo = async () => {
    mongoose.set('strictQuery', false);

    return connect(config.DATABASE_URL);
};

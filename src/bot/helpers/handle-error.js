import { logger } from '#root/logger.js';

export const handleError = async (error) => {
    const { ctx } = error;
    const err = error.error;

    logger.error({
        update_id: ctx.update.update_id,
        err,
    });
};

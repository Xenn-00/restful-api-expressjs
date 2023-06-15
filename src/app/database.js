import { PrismaClient } from "@prisma/client";
import { logger } from "./logging.js";

export const primaclient = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
})

primaclient.$on('query', (e) => {
    logger.info(e)
})

primaclient.$on('error', (e) => {
    logger.error(e)
})

primaclient.$on('info', (e) => {
    logger.info(e)
})

primaclient.$on('warn', (e) => {
    logger.warn(e)
})
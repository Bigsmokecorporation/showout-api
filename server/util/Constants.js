import dotenv from 'dotenv';
dotenv.config();

export default {
    LOG_LEVEL: 'debug',
    JSDOC_OPTIONS: {
        failOnErrors: true,
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'ShowOut API',
                version: '1.0.0',
            },
            servers: [
                {
                    url: process.env.BASE_URL,
                    description: 'Staging server',
                }
            ],
            security: [
                {
                    bearerAuth: []
                }
            ]
        },
        apis: ['./server/routes/*.js'],
    },
};
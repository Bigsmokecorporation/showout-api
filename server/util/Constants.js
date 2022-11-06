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
                    url: 'https://api.x/',
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
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
                    bearerAuth: {
                        "name": "Authorization",
                        "type": "apiKey",
                        "in": "header",
                    }
                }
            ]
        },
        apis: ['./server/routes/*.js'],
    },
    DOCS: {
        'openapi': '3.0.0',
        'info': {
            'title': 'ShowOut API',
            'version': '1.0.0'
        },
        'servers': [
            {
                'url': process.env.BASE_URL,
                'description': 'Staging server'
            }
        ],
        'paths': {},
        components: {
            schemas: {
                Success: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'SUCCESS'
                        },
                        data: {
                            type: 'object'
                        },
                        message: {
                            type: 'string'
                        },
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'FAILED'
                        },
                        data: {
                            type: 'object'
                        },
                        message: {
                            type: 'string'
                        },
                    }
                },
            }
        }
    }
};
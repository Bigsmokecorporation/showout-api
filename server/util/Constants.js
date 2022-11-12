import dotenv from 'dotenv';
dotenv.config();

export default {
    LOG_LEVEL: 'debug',
    MAX_FILE_UPLOAD: 51000000,
    BUCKET: 'user-gen-content',
    S3: 'https://user-gen-content.s3.amazonaws.com/',
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
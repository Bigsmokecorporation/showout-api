export default (swagger) => {

    swagger.paths['/user/create'] = {
        'post': {
            'tags': [
                'User'
            ],
            description: 'Creates A User Account',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                full_name: {
                                    type: 'string'
                                },
                                email: {
                                    type: 'string'
                                },
                                stage_name: {
                                    type: 'string',
                                    example: 'Smooth'
                                },
                                password: {
                                    type: 'string',
                                    example: 123456
                                },
                                gcid: {
                                    type: 'string',
                                    description: 'Mobile device token',
                                    example: 'dfuyfgeg8274t39y98y93yf0y02y0y28ry2r2oh938232hgfh2d947y932yh92'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Creates new user.',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/UserResponse'
                            }
                        }
                    }
                }
            }
        }
    }

    swagger.paths['/user/update'] = {
        put: {
            security: [
                {
                    bearerAuth: []
                }
            ],
            tags: [
                'User'
            ],
            description: 'Updates A User Account',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/User'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Updated.',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/UserResponse'
                            }
                        }
                    }
                }
            }
        }
    }

    swagger.paths['/user/{id}'] = {
        get: {
            security: [
                {
                    bearerAuth: []
                }
            ],
            tags: [
                'User'
            ],
            description: 'Retrieves A User Account',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Completed successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/UserResponse'
                            }
                        }
                    }
                }
            }
        }
    }

    swagger.components.schemas['User'] = {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                example: '62beeda345678ygfgryt'
            },
            full_name: {
                type: 'string'
            },
            email: {
                type: 'string'
            },
            mobile_number: {
                type: 'string',
                example: 233249713683
            },
            gender: {
                type: 'string',
                enum: [
                    'M',
                    'F'
                ]
            },
            user_type: {
                type: 'string',
                enum: [
                    'corporate', 'individual'
                ]
            },
            tag_name: {
                type: 'string',
                example: 'theKing'
            },
            strap_line: {
                type: 'string',
                example: 'Cool headed nig'
            },
            city: {
                type: 'string',
                example: 'Accra'
            },
            country: {
                type: 'string',
                example: 'Ghana'
            },
            stage_name: {
                type: 'string',
                example: 'Smooth'
            },
            photo_url: {
                type: 'string',
                example: 'https://ccc'
            },
            bio: {
                type: 'string',
                example: 'More stuff here'
            },
            is_active: {
                type: 'boolean',
                example: true
            },
            email_verified: {
                type: 'boolean',
                example: true
            },
            biometric_enabled: {
                type: 'boolean',
                example: true
            },
            dob: {
                type: 'string',
                format: '$date',
                example: '2000-02-16T00:00:00.000Z'
            },
            gcid: {
                type: 'string',
                example: 'dfuyfgeg8274t39y98y93yf0y02y0y28ry2r2oh938232hgfh2d947y932yh92'
            },
            token: {
                type: 'string',
                example: 'ghtr678iot39y98y93yf0y02y0u76543ertghj38232hgfh2567yhj965edh90'
            },
            refresh_token: {
                type: 'string',
                example: 'dfuyfgeg8274t39y98y93yf0y02y0y28ry2r2oh938232hgfh2d947y932yh92'
            }
        }
    }

    swagger.components.schemas['UserResponse'] = {
        type: 'object',
        properties: {
            status: {
                type: 'string',
                example: 'SUCCESS'
            },
            data: {
                $ref: '#/components/schemas/User'
            },
            message: {
                type: 'string'
            }
        }
    }

    return swagger
}
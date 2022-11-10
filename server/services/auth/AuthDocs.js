export default (swagger) => {
    swagger.paths['/auth/login'] = {
        post: {
            tags: [
                'Auth'
            ],
            description: 'Authenticates a user',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string'
                                },
                                password: {
                                    type: 'string'
                                },
                                gcid: {
                                    type: 'string',
                                    description: 'Mobile device token',
                                    example: 123456
                                }
                            }
                        }
                    }
                }
            },
            'responses': {
                '200': {
                    'description': 'Successful login.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/UserResponse'
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/auth/apple-login'] = {
        post: {
            tags: [
                'Auth'
            ],
            description: 'Authenticates a user',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                access_token: {
                                    type: 'string'
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
                    description: 'Successful login',
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
    swagger.paths['/auth/facebook-login'] = {
        post: {
            tags: [
                'Auth'
            ],
            description: 'Authenticates a user',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                access_token: {
                                    type: 'string'
                                },
                                user_id: {
                                    type: 'string'
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
                    description: 'Successful login.',
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
    swagger.paths['/auth/google-login'] = {
        post: {
            tags: [
                'Auth'
            ],
            description: 'Authenticates a user',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                access_token: {
                                    type: 'string'
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
                    description: 'Successful login.',
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

    swagger.paths['/auth/verify'] = {
        post: {
            tags: [
                'Auth'
            ],
            description: 'Verifies email token',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'string',
                                    description: 'Id of user',
                                    example: 'gfdrsew454678907ytyr'
                                },
                                token: {
                                    type: 'string',
                                    example: 123456
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Successful verification.'
                }
            }
        }
    }
    return swagger
}
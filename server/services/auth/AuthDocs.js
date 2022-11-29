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
                                    type: 'string',
                                    example: 'bstoney7@gmail.com'
                                },
                                password: {
                                    type: 'string',
                                    example: '123456'
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
            responses: {
                200: {
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
                                },
                                terms_accepted: {
                                    type: 'boolean'
                                },
                                terms_accepted_at: {
                                    type: 'string',
                                    example: '2022-01-01 12:00:00'
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
                                },
                                terms_accepted: {
                                    type: 'boolean'
                                },
                                terms_accepted_at: {
                                    type: 'string',
                                    example: '2022-01-01 12:00:00'
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
                                    type: 'string',
                                    description: 'id_token from Google',
                                },
                                gcid: {
                                    type: 'string',
                                    description: 'Mobile device token',
                                    example: 'dfuyfgeg8274t39y98y93yf0y02y0y28ry2r2oh938232hgfh2d947y932yh92'
                                },
                                terms_accepted: {
                                    type: 'boolean'
                                },
                                terms_accepted_at: {
                                    type: 'string',
                                    example: '2022-01-01 12:00:00'
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
                                    example: 'fc4y04sK9OiFjcbFZKB1'
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
                    description: 'Successful verification.',
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
    swagger.paths['/auth/resend-verification-code'] = {
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
                                email: {
                                    type: 'string',
                                    example: 'bstoney7@gmail.com'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Successful verification.',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Success'
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/auth/refresh-token'] = {
        post: {
            tags: [
                'Auth'
            ],
            description: 'Refreshes user token',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'string',
                                    example: 'fc4y04sK9OiFjcbFZKB1'
                                },
                                refresh_token: {
                                    type: 'string',
                                    description: 'Refresh id from previous session',
                                    example: 'gfdrsew454678907ytyrhjgfyr67689iuojkhjghfytr6e54578'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Successful verification.',
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
    swagger.paths['/auth/forgot-password'] = {
        post: {
            tags: [
                'Auth'
            ],
            description: 'Begins a password reset flow',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'string',
                                    example: 'fc4y04sK9OiFjcbFZKB1'
                                },
                                email: {
                                    type: 'string',
                                    example: 'bstoney7@gmail.com'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Reset link sent.',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Success'
                            }
                        }
                    }
                }
            }
        }
    }
    return swagger
}
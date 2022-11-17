export default (swagger) => {
    swagger.paths['/admin/create'] = {
        'post': {
            'tags': [
                'Admin'
            ],
            description: 'Creates An Admin Account',
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
                                role_id: {
                                    type: 'string',
                                    example: '234rtfg543234'
                                },
                                password: {
                                    type: 'string',
                                    example: 123456
                                },
                                mobile_number: {
                                    type: 'string',
                                    example: '+12345'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Creates new admin.',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/AdminResponse'
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/admin/login'] = {
        post: {
            tags: [
                'Admin'
            ],
            description: 'Authenticates an admin',
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
                                '$ref': '#/components/schemas/AdminResponse'
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/admin/refresh-token'] = {
        post: {
            tags: [
                'Admin'
            ],
            description: 'Refreshes admin token',
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
                                $ref: '#/components/schemas/AdminResponse'
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/admin/get-users'] = {
        get: {
            tags: [
                'Admin'
            ],
            description: 'Retrieves users',
            parameters: [],
            responses: {
                200: {
                    description: 'Successful retrieval.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        example: 'SUCCESS'
                                    },
                                    data: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/UserMinimal'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    swagger.components.schemas['Admin'] = {
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
            role_id: {
                type: 'string',
                example: 'fdre6r7687980iojhk'
            },
            is_active: {
                type: 'boolean'
            },
            role_name: {
                type: 'string',
                example: 'Super Admin'
            },
            can_manage_admins: {
                type: 'boolean'
            },
            can_manage_users: {
                type: 'boolean'
            },
            can_manage_cards: {
                type: 'boolean'
            },
            can_manage_transactions: {
                type: 'boolean'
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
    swagger.components.schemas['AdminResponse'] = {
        type: 'object',
        properties: {
            status: {
                type: 'string',
                example: 'SUCCESS'
            },
            data: {
                $ref: '#/components/schemas/Admin'
            },
            message: {
                type: 'string'
            }
        }
    }

    return swagger
}
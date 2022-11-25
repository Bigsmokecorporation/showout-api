export default (swagger) => {
    swagger.paths['/card/create'] = {
        post: {
            tags: [
                'Card'
            ],
            description: 'Creates a card',
            requestBody: {
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                media: {
                                    type: 'string',
                                    format: 'binary'
                                },
                                cover_art: {
                                    type: 'string',
                                    format: 'binary'
                                },
                                media_demo: {
                                    type: 'string',
                                    format: 'binary'
                                },
                                owner_has_rights_to_upload: {
                                    type: 'boolean',
                                },
                                on_other_platforms: {
                                    type: 'boolean',
                                },
                                playlist_request: {
                                    type: 'boolean',
                                },
                                card_title: {
                                    type: 'string',
                                },
                                media_meta: {
                                    type: 'json',
                                },
                                artist_info: {
                                    type: 'string',
                                },
                                production_info: {
                                    type: 'string',
                                    format: 'binary'
                                },
                                lyrics: {
                                    type: 'string'
                                },
                                style: {
                                    type: 'string',
                                    format: 'json',
                                    example: {
                                        x: 'y'
                                    }
                                },
                                stream_info: {
                                    type: 'string'
                                },
                                share_value: {
                                    type: 'numeric'
                                },
                                terms_accepted: {
                                    type: 'boolean'
                                },
                                card_type: {
                                    type: 'string',
                                    enum: [
                                        'music',
                                        'artwork'
                                    ],
                                    default: 'music'
                                },
                                card_genre_id: {
                                    type: 'string',
                                    example: 'jghfdew43567890'
                                },
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    'description': 'Card created.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/CardResponse'
                            }
                        }
                    }
                }
            }
        }
    }

    swagger.paths['/card/{id}'] = {
        get: {
            tags: [
                'Card'
            ],
            description: 'Retrieve a card',
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
                    'description': 'Card retrieved.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/CardResponse'
                            }
                        }
                    }
                }
            }
        }
    }

    swagger.paths['/card/update/{id}'] = {
        put: {
            tags: [
                'Card'
            ],
            description: 'Updates a card',
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
            requestBody: {
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                media: {
                                    type: 'string',
                                    format: 'binary'
                                },
                                cover_art: {
                                    type: 'string',
                                    format: 'binary'
                                },
                                media_demo: {
                                    type: 'string',
                                    format: 'binary'
                                },
                                owner_has_rights_to_upload: {
                                    type: 'boolean',
                                },
                                on_other_platforms: {
                                    type: 'boolean',
                                },
                                playlist_request: {
                                    type: 'boolean',
                                },
                                card_title: {
                                    type: 'string',
                                },
                                media_meta: {
                                    type: 'json',
                                },
                                artist_info: {
                                    type: 'string',
                                },
                                production_info: {
                                    type: 'string',
                                    format: 'binary'
                                },
                                lyrics: {
                                    type: 'string'
                                },
                                style: {
                                    type: 'string',
                                    format: 'json',
                                    example: {
                                        x: 'y'
                                    }
                                },
                                stream_info: {
                                    type: 'string'
                                },
                                share_value: {
                                    type: 'numeric'
                                },
                                terms_accepted: {
                                    type: 'boolean'
                                },
                                card_type: {
                                    type: 'string',
                                    enum: [
                                        'music',
                                        'artwork'
                                    ],
                                    default: 'music'
                                },
                                card_genre_id: {
                                    type: 'string',
                                    example: 'jghfdew43567890'
                                },
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    'description': 'Card retrieved.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/CardResponse'
                            }
                        }
                    }
                }
            }
        }
    }

    swagger.paths['/card/list'] = {
        get: {
            tags: [
                'Card'
            ],
            description: 'Retrieve cards',
            parameters: [
                {
                    in: 'query',
                    name: 'user_id',
                    description: 'user id, to fetch user\'s cards'
                }
            ],
            responses: {
                200: {
                    'description': 'Cards retrieved.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/CardResponse'
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/card/genres'] = {
        get: {
            tags: [
                'Card'
            ],
            description: 'Gets card genres',
            responses: {
                200: {
                    'description': 'List of genres.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/GenreResponse'
                            }
                        }
                    }
                }
            }
        }
    }

    swagger.components.schemas['Card'] = {
        type: 'object',
        properties: {
            owner_id: {
                type: 'string',
            },
            owner_has_rights_to_upload: {
                type: 'boolean',
            },
            on_other_platforms: {
                type: 'boolean',
            },
            card_title: {
                type: 'string',
            },
            cover_art_url: {
                type: 'string',
            },
            media_url: {
                type: 'string',
            },
            media_demo_url: {
                type: 'string',
            },
            media_meta: {
                type: 'json',
            },
            artist_info: {
                type: 'string',
            },
            production_info: {
                type: 'string',
                format: 'binary'
            },
            lyrics: {
                type: 'string'
            },
            style: {
                type: 'string'
            },
            stream_info: {
                type: 'string'
            },
            share_value: {
                type: 'numeric'
            },
            card_type: {
                type: 'string',
                enum: [
                    'music',
                    'artwork'
                ],
                default: 'music'
            },
            card_genre_id: {
                type: 'string',
                example: 'jghfdew43567890'
            },
            hotometer_value: {
                type: 'string'
            },
            playable: {
                type: 'boolean'
            },
            created_at: {
                type: 'string',
                format: '$date'
            },
        }
    }
    swagger.components.schemas['CardResponse'] = {
        type: 'object',
        properties: {
            status: {
                type: 'string',
                example: 'SUCCESS'
            },
            data: {
                $ref: '#/components/schemas/Card'
            },
            message: {
                type: 'string'
            }
        }
    }
    swagger.components.schemas['GenreResponse'] = {
        type: 'object',
        properties: {
            status: {
                type: 'string',
                example: 'SUCCESS'
            },
            data: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                    },
                    genre: {
                        type: 'string',
                        example: 'pop'
                    }
                }
            },
            message: {
                type: 'string'
            }
        }
    }

    return swagger
}
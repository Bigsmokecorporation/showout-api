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

    swagger.paths['/card/random'] = {
        get: {
            tags: [
                'Card'
            ],
            description: 'Retrieve random cards',
            responses: {
                200: {
                    'description': 'Random cards retrieved.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/MultiCardResponse'
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/card/search'] = {
        get: {
            tags: [
                'Card'
            ],
            description: 'Retrieve cards matching keyword',
            parameters: [
                {
                    in: 'query',
                    name: 'keyword',
                    description: 'Search by anything...'
                }
            ],
            responses: {
                200: {
                    'description': 'Cards matching keyword retrieved.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/MultiCardResponse'
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
                    name: 'owner_id',
                    description: 'owner id, to fetch user\'s cards'
                },
                {
                    in: 'query',
                    name: 'card_genre_id',
                    description: 'genre id cards to fetch'
                }
            ],
            responses: {
                200: {
                    'description': 'Cards retrieved.',
                    'content': {
                        'application/json': {
                            'schema': {
                                type: 'array',
                                items: {
                                    '$ref': '#/components/schemas/MultiCardResponse'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/card/popular'] = {
        get: {
            tags: [
                'Card'
            ],
            description: 'Retrieve popular cards',
            responses: {
                200: {
                    'description': 'Popular cards retrieved.',
                    'content': {
                        'application/json': {
                            'schema': {
                                type: 'array',
                                items: {
                                    '$ref': '#/components/schemas/MultiCardResponse'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/card/recently-played'] = {
        get: {
            tags: [
                'Card'
            ],
            description: 'Retrieve recently-played cards',
            responses: {
                200: {
                    'description': 'Recently-played cards retrieved.',
                    'content': {
                        'application/json': {
                            'schema': {
                                type: 'array',
                                items: {
                                    '$ref': '#/components/schemas/MultiCardResponse'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/card/trending'] = {
        get: {
            tags: [
                'Card'
            ],
            description: 'Retrieve trending cards',
            responses: {
                200: {
                    'description': 'Trending cards retrieved.',
                    'content': {
                        'application/json': {
                            'schema': {
                                type: 'array',
                                items: {
                                    '$ref': '#/components/schemas/MultiCardResponse'
                                }
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

    //  ACTIONS
    swagger.paths['/card/like/{id}'] = {
        get: {
            tags: [
                'Card'
            ],
            description: 'Likes a card',
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
                    'description': 'Card liked.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/Success'
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/card/dislike/{id}'] = {
        get: {
            tags: [
                'Card'
            ],
            description: 'Dislikes a card',
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
                    'description': 'Card disliked.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/Success'
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/card/favorite/{id}'] = {
        get: {
            tags: [
                'Card'
            ],
            description: 'Add a card to favorites',
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
                    'description': 'Card added to favorites.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/Success'
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/card/unfavorite/{id}'] = {
        get: {
            tags: [
                'Card'
            ],
            description: 'Remove card from favorites',
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
                    'description': 'Removed card from favorites.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/Success'
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/card/play/{id}'] = {
        get: {
            tags: [
                'Card'
            ],
            description: 'Plays a card',
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
                    'description': 'Card played.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/Success'
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
            terms_accepted_at: {
                type: 'string',
                format: '$date'
            },
            genre: {
                type: 'string',
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
    swagger.components.schemas['MultiCardResponse'] = {
        type: 'object',
        properties: {
            status: {
                type: 'string',
                example: 'SUCCESS'
            },
            data: {
                type: 'array',
                items: {
                    '$ref': '#/components/schemas/Card'
                }
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
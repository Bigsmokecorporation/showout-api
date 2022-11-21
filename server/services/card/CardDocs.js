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
                                card_type: {
                                    type: 'string',
                                    enum: [
                                        'music',
                                        'artwork'
                                    ],
                                    default: 'music'
                                },
                                card_genre: {
                                    type: 'string',
                                    enum: [
                                        'pop',
                                        'country',
                                        'hiphop',
                                        'rnb',
                                        'jazz',
                                        'reggae',
                                        'hiphop',
                                        'rock',
                                        'metal',
                                    ]
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
            card_genre: {
                type: 'string',
                enum: [
                    'pop',
                    'country',
                    'hiphop',
                    'rnb',
                    'jazz',
                    'reggae',
                    'hiphop',
                    'rock',
                    'metal',
                ]
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

    return swagger
}
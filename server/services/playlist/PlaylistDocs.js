export default (swagger) => {
    swagger.paths['/playlist/create'] = {
        post: {
            tags: [
                'Playlist'
            ],
            description: 'Creates a playlist',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                title: {
                                    type: 'string',
                                },
                                description: {
                                    type: 'string',
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
                                '$ref': '#/components/schemas/Success'
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/playlist/join'] = {
        post: {
            tags: [
                'Playlist'
            ],
            description: 'Requests to join playlist',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                card_id: {
                                    type: 'string',
                                },
                                playlist_id: {
                                    type: 'string',
                                },
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    'description': 'Playlist request created.',
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
    swagger.paths['/playlist/add-tracks/:playlist_id'] = {
        post: {
            tags: [
                'Playlist'
            ],
            description: 'Adds tracks to a playlist',
            requestBody: {
                description: 'Array of card ids',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                tracks: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                        example: 'jhgfdrew324567890er4t'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    'description': 'Cards added.',
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

    return swagger
}
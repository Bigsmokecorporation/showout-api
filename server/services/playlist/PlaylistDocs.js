export default (swagger) => {
    swagger.paths['/playlist/{id}'] = {
        get: {
            tags: [
                'Playlist'
            ],
            description: 'Gets a playlist',
            parameters: [
                {
                    in: 'path',
                    name: 'id'
                }
            ],
            responses: {
                200: {
                    'description': 'Fetches playlist.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/PlaylistResponse'
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/playlist/list'] = {
        get: {
            tags: [
                'Playlist'
            ],
            description: 'Gets all playlists',
            responses: {
                200: {
                    'description': 'Fetches all playlists.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/MultiPlaylistResponse'
                            }
                        }
                    }
                }
            }
        }
    }
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
    swagger.paths['/playlist/add-tracks/{playlist_id}'] = {
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

    swagger.components.schemas['Playlist'] = {
        type: 'object',
        properties: {
            id: {
                type: 'string'
            },
            title: {
                type: 'string'
            },
            description: {
                type: 'string'
            }
        }
    }
    swagger.components.schemas['PlaylistResponse'] = {
        type: 'object',
        properties: {
            status: {
                type: 'string',
                example: 'SUCCESS'
            },
            data: {
                $ref: '#/components/schemas/Playlist'
            },
            message: {
                type: 'string'
            }
        }
    }
    swagger.components.schemas['MultiPlaylistResponse'] = {
        type: 'object',
        properties: {
            status: {
                type: 'string',
                example: 'SUCCESS'
            },
            data: {
                type: 'array',
                items: {
                    '$ref': '#/components/schemas/Playlist'
                }
            },
            message: {
                type: 'string'
            }
        }
    }

    return swagger
}
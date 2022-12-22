export default (swagger) => {
    swagger.paths['/card-listings/create'] = {
        post: {
            tags: [
                'CardListings'
            ],
            description: 'Creates a card listing',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                card_id: {
                                    type: 'string',
                                },
                                list_percentage: {
                                    type: 'number',
                                    format: 'double'
                                },
                                lease_duration_years: {
                                    type: 'integer'
                                },
                                listing_type: {
                                    type: 'string',
                                    enum: [
                                        'general',
                                        'auction',
                                        'trade'
                                    ],
                                },
                                card_value: {
                                    type: 'number',
                                    multipleOf: 0.01
                                },
                                listing_target: {
                                    type: 'string',
                                    enum: [
                                        'community',
                                        'direct',
                                    ],
                                },
                                auction_minimum_sale_value: {
                                    type: 'number',
                                    multipleOf: 0.01
                                },
                                auction_start_price: {
                                    type: 'number',
                                    multipleOf: 0.01
                                },
                                auction_duration_days: {
                                    type: 'integer'
                                },
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    'description': 'Card listing created.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/CardListingResponse'
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/card-listings/{id}'] = {
        get: {
            tags: [
                'CardListings'
            ],
            description: 'Retrieve a card listing',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Listing id',
                    required: true,
                }
            ],
            responses: {
                200: {
                    'description': 'Card listing retrieved.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/CardListingResponse'
                            }
                        }
                    }
                }
            }
        }
    }
    swagger.paths['/card-listings/market'] = {
        get: {
            tags: [
                'CardListings'
            ],
            description: 'Retrieves listings for marketplace',
            responses: {
                200: {
                    'description': 'Card listings retrieved.',
                    'content': {
                        'application/json': {
                            'schema': {
                                '$ref': '#/components/schemas/MultiCardListingResponse'
                            }
                        }
                    }
                }
            }
        }
    }

    swagger.components.schemas['CardListing'] = {
        type: 'object',
        properties: {
            id: {
                type: 'string',
            },
            card_id: {
                type: 'string',
            },
            list_percentage: {
                type: 'number',
                multipleOf: 0.01
            },
            lease_duration_years: {
                type: 'integer'
            },
            listing_type: {
                type: 'string',
                enum: [
                    'general',
                    'auction',
                    'trade'
                ],
            },
            card_value: {
                type: 'number',
                multipleOf: 0.01
            },
            auction_minimum_sale_value: {
                type: 'number',
                multipleOf: 0.01
            },
            auction_start_price: {
                type: 'number',
                multipleOf: 0.01
            },
            auction_duration_days: {
                type: 'integer'
            },
            auction_expiry: {
                type: 'string',
                format: '$date'
            },
            listing_target: {
                type: 'string',
                enum: [
                    'community',
                    'direct',
                ],
            },
            created_at: {
                type: 'string',
                format: '$date'
            },
            card: {
                $ref: '#/components/schemas/Card'
            }
        }
    }
    swagger.components.schemas['CardListingResponse'] = {
        type: 'object',
        properties: {
            status: {
                type: 'string',
                example: 'SUCCESS'
            },
            data: {
                $ref: '#/components/schemas/CardListing'
            },
            message: {
                type: 'string'
            }
        }
    }
    swagger.components.schemas['MultiCardListingResponse'] = {
        type: 'object',
        properties: {
            status: {
                type: 'string',
                example: 'SUCCESS'
            },
            data: {
                type: 'array',
                items: {
                    '$ref': '#/components/schemas/CardListing'
                }
            },
            message: {
                type: 'string'
            }
        }
    }

    return swagger
}
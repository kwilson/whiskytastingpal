export const getQueryBody = terms => ({
    "from": 0,
    "size": 25,
    "sort": [
        {
            "_score": {
                "order": "desc"
            }
        }
    ],
    "_source": {
        "include": [
            "id",
            "price",
            "tradeprice",
            "title",
            "description",
            "url",
            "abv",
            "volume",
            "age",
            "stocklevel",
            "hasdram",
            "productimage",
            "atomstock",
            "distilleryurl",
            "isdiscontinued",
            "comingsoon",
            "stockincoming",
            "distillery",
            "releasedate",
            "isvatableproduct",
            "hasfreeshipping",
            "hasfreeshippingworldwide",
            "hasActiveLightningDeal",
            "discountFlag",
            "rRP",
            "previousPrice",
            "userrating",
            "preorder",
            "maxnumberpercustomer",
            "reviewcount",
            "rRP",
            "isDiscounted",
            "previousPrice",
            "discountFlag"
        ]
    },
    "query": {
        "bool": {
            "must": [
                {
                    "has_child": {
                        "type": "stocks",
                        "query": {
                            "match_all": {}
                        },
                        "inner_hits": {
                            "_source": {
                                "include": [
                                    "id",
                                    "stocklevel"
                                ]
                            }
                        }
                    }
                },
                {
                    "function_score": {
                        "query": {
                            "bool": {
                                "disable_coord": true,
                                "should": [
                                    {
                                        "dis_max": {
                                            "queries": [
                                                {
                                                    "match": {
                                                        "searchfield": {
                                                            "query": terms,
                                                            "slop": 5,
                                                            "boost": 2,
                                                            "operator": "and",
                                                            "type": "phrase"
                                                        }
                                                    }
                                                },
                                                {
                                                    "match": {
                                                        "searchfield.metaphone": {
                                                            "query": terms,
                                                            "boost": 0.5,
                                                            "operator": "and"
                                                        }
                                                    }
                                                },
                                                {
                                                    "multi_match": {
                                                        "type": "cross_fields",
                                                        "query": terms,
                                                        "fields": [
                                                            "title.partial",
                                                            "targettemplate.partial^1.5",
                                                            "searchfield.partial^0.5",
                                                            "distillery.partial"
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "multi_match": {
                                            "type": "cross_fields",
                                            "query": terms,
                                            "fields": [
                                                "style.style_analyzed^0.3",
                                                "targettemplate.targettemplate_snowball^1.5"
                                            ],
                                            "boost": 2
                                        }
                                    }
                                ]
                            }
                        },
                        "functions": [
                            {
                                "script_score": {
                                    "script": {
                                        "file": "product_ranking"
                                    }
                                }
                            },
                            {
                                "filter": {
                                    "has_child": {
                                        "type": "stocks",
                                        "query": {
                                            "term": {
                                                "stocklevel": {
                                                    "value": "0"
                                                }
                                            }
                                        }
                                    }
                                },
                                "weight": "0.5"
                            }
                        ],
                        "boost_mode": "replace"
                    }
                }
            ]
        }
    },
    "aggs": {
        "stocklevel": {
            "filter": {
                "and": {
                    "filters": [
                        {
                            "terms": {
                                "targettemplateid": [
                                    "1759"
                                ]
                            }
                        }
                    ]
                }
            },
            "aggs": {
                "aggregateName": {
                    "terms": {
                        "field": "stocklevel",
                        "size": 2
                    }
                }
            }
        },
        "hasdram": {
            "filter": {
                "and": {
                    "filters": [
                        {
                            "terms": {
                                "targettemplateid": [
                                    "1759"
                                ]
                            }
                        }
                    ]
                }
            },
            "aggs": {
                "aggregateName": {
                    "terms": {
                        "field": "hasdram",
                        "size": 2
                    }
                }
            }
        },
        "atomstock": {
            "filter": {
                "and": {
                    "filters": [
                        {
                            "terms": {
                                "targettemplateid": [
                                    "1759"
                                ]
                            }
                        }
                    ]
                }
            },
            "aggs": {
                "aggregateName": {
                    "terms": {
                        "field": "atomstock",
                        "size": 2
                    }
                }
            }
        },
        "hasfreeshipping": {
            "filter": {
                "and": {
                    "filters": [
                        {
                            "terms": {
                                "targettemplateid": [
                                    "1759"
                                ]
                            }
                        }
                    ]
                }
            },
            "aggs": {
                "aggregateName": {
                    "terms": {
                        "field": "hasfreeshipping",
                        "size": 2
                    }
                }
            }
        },
        "isDiscounted": {
            "filter": {
                "and": {
                    "filters": [
                        {
                            "terms": {
                                "targettemplateid": [
                                    "1759"
                                ]
                            }
                        }
                    ]
                }
            },
            "aggs": {
                "aggregateName": {
                    "terms": {
                        "field": "isDiscounted",
                        "size": 2
                    }
                }
            }
        },
        "targettemplates": {
            "terms": {
                "field": "targettemplate_agg",
                "size": 0
            }
        },
        "styles": {
            "filter": {
                "and": {
                    "filters": [
                        {
                            "terms": {
                                "targettemplateid": [
                                    "1759"
                                ]
                            }
                        }
                    ]
                }
            },
            "aggs": {
                "aggregateName": {
                    "terms": {
                        "field": "style_agg",
                        "size": 20
                    }
                }
            }
        },
        "countries": {
            "filter": {
                "and": {
                    "filters": [
                        {
                            "terms": {
                                "targettemplateid": [
                                    "1759"
                                ]
                            }
                        }
                    ]
                }
            },
            "aggs": {
                "aggregateName": {
                    "terms": {
                        "field": "country_agg",
                        "size": 20
                    }
                }
            }
        },
        "regions": {
            "filter": {
                "and": {
                    "filters": [
                        {
                            "terms": {
                                "targettemplateid": [
                                    "1759"
                                ]
                            }
                        }
                    ]
                }
            },
            "aggs": {
                "aggregateName": {
                    "terms": {
                        "field": "region_agg",
                        "size": 20
                    }
                }
            }
        },
        "distilleries": {
            "filter": {
                "and": {
                    "filters": [
                        {
                            "terms": {
                                "targettemplateid": [
                                    "1759"
                                ]
                            }
                        }
                    ]
                }
            },
            "aggs": {
                "aggregateName": {
                    "terms": {
                        "field": "distillery_agg",
                        "size": 20
                    }
                }
            }
        },
        "bottlesizes": {
            "filter": {
                "and": {
                    "filters": [
                        {
                            "terms": {
                                "targettemplateid": [
                                    "1759"
                                ]
                            }
                        }
                    ]
                }
            },
            "aggs": {
                "aggregateName": {
                    "terms": {
                        "field": "volume",
                        "size": 20
                    }
                }
            }
        }
    },
    "post_filter": {
        "and": {
            "filters": [
                {
                    "terms": {
                        "targettemplateid": [
                            "1759"
                        ]
                    }
                }
            ]
        }
    }
});

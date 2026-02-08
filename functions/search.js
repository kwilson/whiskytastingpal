import axios from 'axios';
import { getQueryBody } from './search/utils';

const instance = axios.create({
    baseURL: 'https://www.masterofmalt.com',
    headers: {
        "accept": "application/json",
        "accept-language": "en-GB,en;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "referer": "https://www.masterofmalt.com/search/",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "origin": "https://www.masterofmalt.com",
        "connection": "keep-alive",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
    },
});

const trimSlash = value => value.replace(/(.+)\//, '$1');

const mapResult = result => {
    const {
        title,
        url,
        productimage,
        distillery,
        abv,
    } = result.source;
    return {
        title,
        url: trimSlash(url),
        image: productimage,
        distillery,
        abv,
    };
};

export const handler = (event, context, callback) => {
    try {
        const { terms } = event.queryStringParameters;
        instance.post(
            '/api/search/products/-1/true/464/0/',
            getQueryBody(terms), {
            params: {
                searchTerm: terms,
                page: 1,
                searchProductTypes: false,
                searchBrands: false,
                searchAges: false,
            },
        })
            .then(response => {
                callback(null, {
                    statusCode: response.status,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(response.data.body.map(mapResult)),
                });
            })
            .catch(error => {
                callback({
                    statusCode: 500,
                    body: error
                });
            });
    } catch (error) {
        callback({
            statusCode: 500,
            body: error
        });
    }
};

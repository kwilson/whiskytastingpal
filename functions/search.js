import axios from 'axios';
import { getQueryBody } from './search/utils';

const instance = axios.create({
    baseURL: 'https://www.masterofmalt.com',
    headers: {
        "accept": "application/json",
        "referer": "https://www.masterofmalt.com/search/"
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
};

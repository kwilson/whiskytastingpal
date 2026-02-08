import axios from 'axios';
import { load } from 'cheerio';

const getFullUrl = partial => `https://www.masterofmalt.com${partial}`;

/**
 * @param {string} label
 */
const trimLabel = label => label.replace(/(^.+):$/, '$1');

/**
 * @param {CheerioElement} note
 */
const getNote = (note) => {
    const $ = load(note);
    const titleNode = $('b');
    if (titleNode.length) {
        const value = $('p').contents().not('b');
        return {
            title: trimLabel(titleNode.text().trim()),
            value: value.text().trim()
        };
    }

    return {
        title: null,
        value: load(note).text()
    };
};

/**
 * @param {Cheerio} ratingNode
 */
const getRating = (ratingNode) => {
    if (ratingNode) {
        const content = ratingNode.attr('content');
        if (content) {
            return content.trim();
        }
    }

    return null;
}

/**
 * @param {Cheerio} node
 */
const getTextValue = node => {
    try {
        if (node) {
            const content = node.text();
            if (content) {
                return content.trim();
            }
        }
    } catch { }

    return null;
}

/**
 * @param {Cheerio} descriptionNode
 */
const getDescription = (descriptionNode) => getTextValue(descriptionNode);

const metaKeys = [
    { label: 'Origin', key: 'wdCountry' },
    { label: 'Region', key: 'wdRegion' },
    { label: 'Style', key: 'wdStyle' },
    { label: 'Distillery', key: 'wdDistillery' },
    { label: 'Bottler', key: 'wdBottler' },
    { label: 'ABV', key: 'wdAlcohol' },
    { label: 'Volume', key: 'wdVolume' },
];

const parse = (html, url) => {
    const $ = load(html);
    const title = $('h1.page_header').text().trim();
    const notes = $('p[id$="TastingNote"]');
    const image = $('img[id$="imgProductBig"]').attr('src');
    const description = getDescription($('[itemprop="description"]'));
    const rating = getRating($('[itemprop="ratingValue"]'));

    const meta = metaKeys.reduce((metaValues, { label, key }) => {
        const value = getTextValue($(`[id$="${key}"] > .kv-val`));
        if (value) {
            return [...metaValues, {
                label,
                value
            }];
        }

        return metaValues;
    }, []);

    return {
        title,
        notes: notes.toArray().map(getNote),
        image,
        description,
        rating,
        url,
        meta
    };
};

const instance = axios.create({
    headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "accept-language": "en-GB,en;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "connection": "keep-alive",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
    },
});

export const handler = (event, context, callback) => {
    const { id } = event.queryStringParameters;
    const url = getFullUrl(id);
    instance.get(url)
        .then(({ status, data }) => {
            const parsed = parse(data, url);

            callback(null, {
                statusCode: status,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parsed)
            });
        })
        .catch(error => {
            callback({
                statusCode: 500,
                body: error
            });
        });
};

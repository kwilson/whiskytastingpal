import axios from 'axios';
import { load } from 'cheerio';

const getFullUrl = partial => `https://www.masterofmalt.com/${partial}`;

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
        title: '',
        value: note.text()
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
 * @param {Cheerio} descriptionNode
 */
const getDescription = (descriptionNode) => {
    if (descriptionNode) {
        const content = descriptionNode.text();
        if (content) {
            return content.trim();
        }
    }

    return null;
}

const parse = (html, url) => {
    const $ = load(html);
    const title = $('h1').text().trim();
    const notes = $('p[id$="TastingNote"]');
    const image = $('img[id$="imgProductBig"]').attr('src');
    const description = getDescription($('[itemprop="description"]'));
    const rating = getRating($('[itemprop="ratingValue"]'));

    return {
        title,
        notes: notes.toArray().map(getNote),
        image,
        description,
        rating,
        url
    };
};

export const handler = (event, context, callback) => {
    const { id } = event.queryStringParameters;
    const url = getFullUrl(id);
    axios.get(url)
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

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

const parse = html => {
    const $ = load(html);
    const title = $('h1').text().trim();
    const notes = $('p[id$="TastingNote"]');
    const img = $('img[id$="imgProductBig"]').attr('src');
    const description = $('[itemprop="description"]').text().trim();
    const rating = $('[itemprop="ratingValue"]').attr('content').trim();

    return {
        title,
        notes: notes.toArray().map(getNote),
        img,
        description,
        rating
    };
};

export const handler = (event, context, callback) => {
    const { id } = event.queryStringParameters;
    const url = getFullUrl(id);
    axios.get(url)
        .then(({ status, data }) => {
            const parsed = parse(data);

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

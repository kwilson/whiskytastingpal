import * as React from 'react';
import { ISearchResult } from '../../types/search-result';

import './search-results.scss';

interface IProps {
    searchResults: ISearchResult[];
    onSelect: (searchResult: ISearchResult) => void;
    onCancel: () => void;
}

const getMeta = (label: string, value: string) => (
    <React.Fragment key={label}>
        <dt className="search-result__meta-label">{label}</dt>
        <dt className="search-result__meta-value">{value}</dt>
    </React.Fragment>
)

const getSearchResult = (
    searchResult: ISearchResult,
    onSelect: (searchResult: ISearchResult) => void
) => {
    const getImageUrl = (url: string) => 'https://www.masterofmalt.com' + url.replace('IMAGEPRESET', '2812');

    const meta = [
        { label: 'ABV', value: `${searchResult.abv}%` },
        { label: 'Distillery', value: searchResult.distillery}
    ].map(({ label, value }) => getMeta(label, value));

    const onClick = () => onSelect(searchResult);

    return (
        <div className="box search-result" onClick={onClick} key={searchResult.url}>
            <article className="media search-result">
                <div className="search-result__image">
                    <figure className="image">
                        <img
                            className="bottle__image"
                            src={getImageUrl(searchResult.productimage)}
                            alt=""
                        />
                    </figure>
                </div>
                <div className="search-result__content">
                    <h2 className="title is-4">{searchResult.title}</h2>
                        <dl className="search-result__meta">
                            {meta}
                        </dl>
                </div>
            </article>
        </div>
    );
};

export const SearchResults: React.StatelessComponent<IProps> = (props) => {
    return (
        <div className="container SearchResults">
            {props.searchResults.map((x) => getSearchResult(x, props.onSelect))}

            <hr />

            <button
                className="button"
                onClick={props.onCancel}
            >Clear</button>
        </div>
    );
};

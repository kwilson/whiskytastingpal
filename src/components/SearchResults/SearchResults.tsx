import * as React from 'react';
import { Link } from 'react-router-dom';
import { ISearchResult } from '../../data';

import './SearchResults.scss';

interface IProps {
    results: ISearchResult[] | null;
    onCancel: () => void;
}

const Meta: React.FunctionComponent<{ label: string, value: string }> = ({
    label,
    value
}) => (
        <>
            <dt className="search-result__meta-label">{label}</dt>
            <dt className="search-result__meta-value">{value}</dt>
        </>
    )

const SearchResult: React.FunctionComponent<{
    searchResult: ISearchResult,
}> = ({
    searchResult,
}) => {
        const getImageUrl = (url: string) => 'https://www.masterofmalt.com' + url.replace('IMAGEPRESET', '2812');

        const meta = [
            { label: 'ABV', value: `${searchResult.abv}%` },
            { label: 'Distillery', value: searchResult.distillery }
        ].map(({ label, value }) => (
            <Meta key={label} label={label} value={value} />
        ));

        return (
            <Link data-testId="search-result" to={searchResult.url} className="box search-result">
                <article className="media search-result">
                    <div className="search-result__image">
                        <figure className="image">
                            <img
                                className="bottle__image"
                                src={getImageUrl(searchResult.image)}
                                alt=""
                            />
                        </figure>
                    </div>
                    <div className="search-result__content">
                        <h2 data-testId="title" className="title is-5">{searchResult.title}</h2>
                        <dl className="search-result__meta">
                            {meta}
                        </dl>
                    </div>
                </article>
            </Link>
        );
    };

export const SearchResults: React.FunctionComponent<IProps> = ({
    results,
    onCancel
}) => {
    if (!results) {
        return null;
    }

    return (
        <div className="container SearchResults">
            {results.length === 0
                ? <p className="content has-text-centered">Sorry, nothing found.</p>
                : results.map((x) => <SearchResult searchResult={x} key={x.url} />)}

            <hr />

            <button
                className="button"
                onClick={onCancel}
            >Clear</button>
        </div>
    );
};

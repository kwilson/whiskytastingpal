import * as React from 'react';
import { ISearchResult } from '../../data';

import './SearchResults.scss';

interface IProps {
    results: ISearchResult[] | null;
    onSelect: (searchResult: ISearchResult) => void;
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
    onSelect: (searchResult: ISearchResult) => void
}> = ({
    searchResult,
    onSelect
}) => {
    const getImageUrl = (url: string) => 'https://www.masterofmalt.com' + url.replace('IMAGEPRESET', '2812');

    const meta = [
        { label: 'ABV', value: `${searchResult.abv}%` },
        { label: 'Distillery', value: searchResult.distillery}
    ].map(({ label, value }) => (
        <Meta key={label} label={label} value={value} />
    ));

    const onClick = () => onSelect(searchResult);

    return (
        <div className="box search-result" onClick={onClick}>
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
                    <h2 className="title is-5">{searchResult.title}</h2>
                        <dl className="search-result__meta">
                            {meta}
                        </dl>
                </div>
            </article>
        </div>
    );
};

export const SearchResults: React.FunctionComponent<IProps> = ({
    results,
    onSelect,
    onCancel
}) => results ? (
    <div className="container SearchResults">
        {results.map((x) => <SearchResult searchResult={x} onSelect={onSelect} key={x.url} />)}

        <hr />

        <button
            className="button"
            onClick={onCancel}
        >Clear</button>
    </div>
) : null;

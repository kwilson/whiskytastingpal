import * as React from 'react';
import { ISearchResult } from '../../types/search-result';

import styles from './search-results.module.scss';

interface IProps {
    searchResults: ISearchResult[];
    onSelect: (searchResult: ISearchResult) => void;
    onCancel: () => void;
}

const getMeta = (label: string, value: string) => (
    <React.Fragment key={label}>
        <dt className={styles.metaLabel}>{label}</dt>
        <dt className={styles.metaValue}>{value}</dt>
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
        <div className={styles.searchResult} onClick={onClick} key={searchResult.url}>
            <article className={styles.media}>
                <div className={styles.imageWrapper}>
                    <figure className={styles.image}>
                        <img
                            src={getImageUrl(searchResult.productimage)}
                            alt=""
                        />
                    </figure>
                </div>
                <div>
                    <h2 className={styles.title}>{searchResult.title}</h2>
                        <dl className={styles.meta}>
                            {meta}
                        </dl>
                </div>
            </article>
        </div>
    );
};

export const SearchResults: React.StatelessComponent<IProps> = (props) => {
    return (
        <div className={styles.container}>
            {props.searchResults.map((x) => getSearchResult(x, props.onSelect))}

            <hr />

            <button
                className={styles.button}
                onClick={props.onCancel}
            >Clear</button>
        </div>
    );
};

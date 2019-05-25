import * as React from 'react'
import { useState, useEffect } from 'react';
import { Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';
import classnames from 'classnames';

import { reducer, INITIAL_STATE } from '../../reducers';
import { SearchForm } from '../search-form';
import { combineEffects } from '../../effects/utils';
import { SearchResults } from '../search-results';
import { ISearchResult } from '../../types/search-result';
import { Loader } from '../loader';
import { Details } from '../details';
import {
    changeSearchQuery,
    hideResult,
    showResult,
    clear,
    Actions
} from '../../actions';

import styles from './app.module.scss';

import { queryChangeEffect$, loadSearchResultsEffect$, selectResultEffect$, loadDetailsEfect$ } from '../../effects';

const action$ = new Subject<Actions>();

export const App: React.StatelessComponent<{}> = () => {
    const [state, setState] = useState(INITIAL_STATE);

    useEffect(() => {
        const store$ = action$.pipe(
            scan(reducer, state),
            startWith(state),
        );

        const subscription = store$.subscribe({
            next: (value) => setState(value)
        });

        return function cleanup() {
            subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const effects$ = combineEffects<Actions>(
            queryChangeEffect$(action$),
            loadSearchResultsEffect$(action$),
            selectResultEffect$(action$),
            loadDetailsEfect$(action$)
        );

        const subscription = effects$.subscribe((x) => action$.next(x));

        return function cleanup() {
            subscription.unsubscribe();
        };
    }, []);

    const dispatch = (action: Actions) => action$.next(action);

    const onChangeValue = (searchQuery: string) =>
        dispatch(changeSearchQuery(searchQuery));

    const onSelectResult = (selectedResult: ISearchResult) =>
        dispatch(showResult(selectedResult));

    const onClear = () => dispatch(clear());

    const onClose = () => dispatch(hideResult());

    const heroCss = classnames(
        styles.hero,
        styles['is-primary'],
    );

    return (
        <>
            <Loader loading={state.isLoading} />

            <section className={heroCss}>
                <div className={styles["hero-body"]}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Whisky Tasting Pal</h1>
                        <h2 className={styles.subtitle}>
                            Because nobody should have to drink alone.
                        </h2>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                {state.details && (
                    <Details
                        details={state.details}
                        onClose={onClose}
                    />
                )}

                {!state.details && (
                    <SearchForm
                        defaultSearchQuery={state.searchQuery}
                        onChangeValue={onChangeValue}
                    />
                )}
            </section>

            {!state.details && state.searchResults.length > 0 && (
                <section className={styles.section}>
                    <SearchResults
                        searchResults={state.searchResults}
                        onCancel={() => onClear()}
                        onSelect={(result) => onSelectResult(result)}
                    />
                </section>
            )}
        </>
    );
};

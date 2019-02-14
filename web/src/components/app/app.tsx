import * as React from 'react'
import { useState, useEffect } from 'react';
import { Subject, Observable, of } from 'rxjs';
import { scan, startWith, map, switchMap, catchError, takeUntil, filter } from 'rxjs/operators';
import { ajax, AjaxError } from 'rxjs/ajax';

import { reducer, INITIAL_STATE } from '../../reducers';
import { SearchForm } from '../search-form';
import { combineEffects, ofType } from '../../effects/utils';
import { SearchResults } from '../search-results';
import { ISearchResult } from '../../types/search-result';
import { Loader } from '../loader';
import { Details } from '../details';
import { loadSearchResults, loadSearchResultsFulfilled, loadSearchResultsRejected, loadDetails, loadDetailsFulfilled, loadDetailsRejected, changeSearchQuery, hideResult, showResult, clear, ReduxAction, ActionType } from '../../actions';
import { IDetails } from '../../types/details';

import './app.scss';

const action$ = new Subject<ReduxAction>();

export const App: React.StatelessComponent<{}> = () => {
    const [state, setState] = useState(INITIAL_STATE);

    useEffect(() => {
        const store$ = action$.pipe(
            scan(reducer, state),
            startWith(state),
        );

        const queryChangeEffect$: Observable<ReduxAction> = action$.pipe(
            ofType(ActionType.CHANGE_SEARCH_QUERY),
            filter(({ payload }) => payload.searchQuery),
            map(({ payload }) => loadSearchResults(payload.searchQuery))
        );

        const loadSearchResultsEffect$: Observable<ReduxAction> = action$.pipe(
            ofType(ActionType.LOAD_SEARCH_RESULTS),
            map((action) => action.payload.searchQuery),
            switchMap(
                (searchQuery: string) => ajax.getJSON<ISearchResult[]>(`/api/search?terms=${searchQuery}`).pipe(
                    map((results) => loadSearchResultsFulfilled(results)),
                    takeUntil(action$.pipe(
                        ofType(
                            ActionType.LOAD_SEARCH_RESULTS,
                            ActionType.CLEAR
                        )
                    )),
                    catchError((_: AjaxError) => loadSearchResultsRejected)
                )
            )
        );

        const selectResultEffect$: Observable<ReduxAction> = action$.pipe(
            ofType(ActionType.SHOW_RESULT),
            map(({ payload }) => loadDetails(payload.selectedResult))
        );

        const loadDetailsEfect$: Observable<ReduxAction> = action$.pipe(
            ofType(ActionType.LOAD_DETAILS),
            map((action) => action.payload.selectedResult.url),
            switchMap(
                (url: string) => ajax.getJSON<IDetails>(`/api/${url}`).pipe(
                    map((details) => loadDetailsFulfilled(details)),
                    takeUntil(action$.pipe(
                        ofType(
                            ActionType.LOAD_DETAILS,
                            ActionType.CHANGE_SEARCH_QUERY,
                            ActionType.CLEAR
                        )
                    )),
                    catchError((_: AjaxError) => loadDetailsRejected)
                )
            )
        );

        const effects$ = combineEffects(
            queryChangeEffect$,
            loadSearchResultsEffect$,
            selectResultEffect$,
            loadDetailsEfect$
        );

        effects$.subscribe((x) => action$.next(x));

        const subscription = store$.subscribe({
            next: (value) => setState(value)
        });

        return function cleanup() {
            subscription.unsubscribe();
        };
    }, []);

    const dispatch = (action: ReduxAction) => action$.next(action);

    const onChangeValue = (searchQuery: string) =>
        dispatch(changeSearchQuery(searchQuery));

    const onSelectResult = (selectedResult: ISearchResult) =>
        dispatch(showResult(selectedResult));

    const onClear = () => dispatch(clear());

    const onClose = () => dispatch(hideResult());

    return (
        <>
            <Loader loading={state.isLoading} />

            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Whisky Tasting Pal</h1>
                        <h2 className="subtitle">
                            Because nobody should have to drink alone.
                    </h2>
                    </div>
                </div>
            </section>

            <section className="section">
                {state.details && (
                    <Details details={state.details} onClose={onClose} />
                )}

                {!state.details && (
                    <SearchForm
                        defaultSearchQuery={state.searchQuery}
                        onChangeValue={onChangeValue}
                    />
                )}
            </section>

            {!state.details && state.searchResults.length > 0 && (
                <section className="section">
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

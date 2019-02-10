import * as React from 'react'
import { useState, useEffect } from 'react';
import { Subject, Observable, of } from 'rxjs';
import { scan, startWith, map, switchMap, catchError, takeUntil } from 'rxjs/operators';
import { ajax, AjaxError } from 'rxjs/ajax';

import { reducer, INITIAL_STATE, ReduxAction, ActionType } from '../../reducers';
import { SearchForm } from '../search-form';
import { combineEffects, ofType } from '../effects/utils';

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
            map(({ payload }) => ({
                type: ActionType.LOAD_SEARCH_RESULTS,
                payload
            }))
        );

        const loadSearchResultsEffect$: Observable<ReduxAction> = action$.pipe(
            ofType(ActionType.LOAD_SEARCH_RESULTS),
            map((action) => action.payload.searchQuery),
            switchMap(
                (searchQuery: string) => ajax.getJSON(`http://localhost:5000/search/${searchQuery}`).pipe(
                    map((results) => ({
                        type: ActionType.LOAD_SEARCH_RESULTS_FULFILLED,
                        payload: {
                            results
                        }
                    })),
                    takeUntil(action$.pipe(
                        ofType(ActionType.LOAD_SEARCH_RESULTS)
                    )),
                    catchError((_: AjaxError) => of({
                        type: ActionType.LOAD_SEARCH_RESULTS_REJECTED
                    }))
                )
            )
        );

        const effects$ = combineEffects(
            queryChangeEffect$,
            loadSearchResultsEffect$
        );

        effects$.subscribe((x) => action$.next(x));

        const subscription = store$.subscribe({
            next: (value) => setState(value)
        });

        return function cleanup() {
            subscription.unsubscribe();
        };
    }, []);

    const onChangeValue = (searchQuery: string) =>
        action$.next({
            type: ActionType.CHANGE_SEARCH_QUERY,
            payload: {
                searchQuery
            }
        });

    return (
        <>
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
                <SearchForm
                    defaultSearchQuery={state.searchQuery}
                    onChangeValue={onChangeValue}
                />
            </section>

            <pre>
                {JSON.stringify(state, null, 2)}
            </pre>
        </>
    );
};

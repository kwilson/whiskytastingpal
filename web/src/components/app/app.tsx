import * as React from 'react'
import { useState, useEffect } from 'react';
import { Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

import { reducer, INITIAL_STATE, ReduxAction, ActionType } from '../../reducers';
import { SearchForm } from '../search-form';

import './app.scss';

const action$ = new Subject<ReduxAction>();

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

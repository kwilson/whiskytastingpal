import * as React from 'react';
import axios from 'axios';

import { Loader } from '../Loader';
import { Search } from '../Search';

import { reducer, INITIAL_STATE } from './reducer';
import { search, searchComplete } from './actions';
import './App.scss';

export interface ISearchResult {
    title: string,
    url: string,
    image: string,
    distillery: string,
    abv: number
}

export const App = () => {
    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)

    const handleSearch = (terms: string) => {
        dispatch(search(terms));
        axios.get<ISearchResult[]>(`/.netlify/functions/search?terms=${terms}`)
            .then(results => dispatch(searchComplete(results.data)));
    }

    return (
        <>
            <Loader loading={state.isLoading} />

            <nav className="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <h1 className="navbar-item App__title">
                            Whisky Tasting Pal
                        </h1>
                    </div>
                </div>
            </nav>

            <section className="section">
                <Search onSubmit={handleSearch} />
            </section>

            <hr />

            <pre>
                {JSON.stringify(state.results, null, 2)}
            </pre>
        </>
    )
};

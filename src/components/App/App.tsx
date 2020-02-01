import * as React from 'react';

import { Loader } from '../Loader';
import { Search } from '../Search';

import { reducer, INITIAL_STATE } from './reducer';
import { search, searchComplete } from './actions';
import './App.scss';
import { getHasSearchResults, getSearchResults } from './selectors';
import { SearchResults } from '../SearchResults';
import { search as searchByTerms } from '../../data';

export const App = () => {
    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
    const hasSearchResults = getHasSearchResults(state);
    const searchResults = getSearchResults(state);

    const handleSearch = (terms: string) => {
        dispatch(search(terms));
        searchByTerms(terms)
            .then(results => dispatch(searchComplete(results)));
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

            {hasSearchResults && (
                <SearchResults results={searchResults} />
            )}
        </>
    )
};

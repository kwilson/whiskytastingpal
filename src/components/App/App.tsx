import * as React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { Loader } from '../Loader';
import { Search } from '../Search';

import { reducer, INITIAL_STATE } from './reducer';
import { search, searchComplete, clearSearch, searchFailed } from './actions';
import './App.scss';
import { getHasSearchResults, getSearchResults, getTerms, getError } from './selectors';
import { SearchResults } from '../SearchResults';
import { search as searchByTerms } from '../../data';
import { WhiskyDetails } from '../WhiskyDetails';

export const App = () => {
    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

    const terms = getTerms(state);
    const hasSearchResults = getHasSearchResults(state);
    const searchResults = getSearchResults(state);
    const error = getError(state);

    React.useEffect(() => {
        if (terms) {
            searchByTerms(terms)
                .then(results => dispatch(searchComplete(results)))
                .catch(error => dispatch(searchFailed(error)));
        }
    }, [terms]);

    const handleSearch = (terms: string) => dispatch(search(terms));
    const onCancel = () => dispatch(clearSearch());

    return (
        <Router>
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

            <Switch>
                <Route path="/:id/*">
                    <WhiskyDetails />
                </Route>
                <Route path="/">
                    <section className="section">
                        <Search onSubmit={handleSearch} />
                    </section>
                    {hasSearchResults && (
                        <SearchResults
                            results={searchResults}
                            onCancel={onCancel}
                        />
                    )}
                    {error && (
                        <section className="container">
                            <p className="content has-text-centered has-text-danger">Sorry, something's gone wrong with that search.</p>
                        </section>
                    )}
                </Route>
            </Switch>
        </Router>
    )
};

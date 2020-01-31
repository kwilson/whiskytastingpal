import * as React from 'react';
import axios from 'axios';

import { Loader } from '../Loader';
import { Search } from '../Search';

import './App.scss';

interface ISearchResult {
    title: string,
    url: string,
    image: string,
    distillery: string,
    abv: number
}

export const App = () => {
    const [results, updateResults] = React.useState<ISearchResult[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSearch = (terms: string) => {
        setIsLoading(true);
        axios.get<ISearchResult[]>(`/.netlify/functions/search?terms=${terms}`)
            .then(results => {
                updateResults(results.data);
                setIsLoading(false);
            });
    }

    return (
        <>
            <Loader loading={isLoading} />

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
                {JSON.stringify(results, null, 2)}
            </pre>
        </>
    )
};

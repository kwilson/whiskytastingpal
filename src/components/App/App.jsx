import * as React from 'react';
import { get } from 'axios';

import { Search } from '../Search';

export const App = () => {
    const [result, updateResults] = React.useState({});

    const handleSearch = (terms) => {
        get(`/.netlify/functions/search?terms=${terms}`)
            .then(results => {
                updateResults(results.data);
            });
    }

    return (
        <>
            <Search onSubmit={handleSearch} />

            <hr />

            <pre>
                {JSON.stringify(result, null, 2)}
            </pre>
        </>
    )
};

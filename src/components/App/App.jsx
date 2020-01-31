import * as React from 'react';
import { get } from 'axios';

export const App = () => {
    const [terms, updateTerms] = React.useState('');
    const [result, updateResults] = React.useState({});

    const handleSearch = (e) => {
        e.preventDefault();
        get(`/.netlify/functions/search?terms=${terms}`)
        .then(results => {
            updateResults(results.data);
        });
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input value={terms} onChange={e => updateTerms(e.target.value)} />
                <button type="submit">Search</button>
            </form>

            <hr />

            <pre>
                {JSON.stringify(result, null, 2)}
            </pre>
        </div>
    )
};

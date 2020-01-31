import * as React from 'react';

export const Search = ({ onSubmit }) => {
    const [terms, updateTerms] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(terms);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={terms} onChange={e => updateTerms(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    );
};

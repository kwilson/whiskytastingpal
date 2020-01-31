import * as React from 'react';

interface IProps {
    onSubmit: (terms: string) => void;
}

export const Search: React.StatelessComponent<IProps> = ({ onSubmit }) => {
    const [terms, updateTerms] = React.useState('');
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
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

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
        <form className="container" onSubmit={handleSubmit}>
            <div className="field has-addons">
                <div className="control is-expanded">
                    <input
                        className="input"
                        type="text"
                        placeholder="Search for a whisky"
                        value={terms}
                        onChange={e => updateTerms(e.target.value)}
                    />
                </div>
                <div className="control">
                    <button className="button is-info">
                        Search
                    </button>
                </div>
            </div>
        </form>
    );
};

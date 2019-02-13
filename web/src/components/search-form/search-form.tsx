import * as React from 'react';
import { useState } from 'react';

interface IProps {
    defaultSearchQuery: string;
    onChangeValue: (searchQuery: string) => void;
}

export const SearchForm: React.StatelessComponent<IProps> = ({ defaultSearchQuery, onChangeValue }) => {
    const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);

    const onChangeSearchQuery: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchQuery(e.target.value);
    };

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        onChangeValue(searchQuery);
    }

    return (
        <form className="container" onSubmit={onSubmit}>
            <div className="field has-addons">
                <div className="control is-expanded">
                    <input
                        className="input is-large"
                        type="text"
                        placeholder="Search for a whisky"
                        value={searchQuery}
                        onChange={onChangeSearchQuery}
                    />
                </div>
                <div className="control">
                    <button className="button is-info is-large">
                        Search
                    </button>
                </div>
            </div>
        </form>
    )
};

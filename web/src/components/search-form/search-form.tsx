import * as React from 'react';
import { useState } from 'react';

import styles from './search-form.module.scss';

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
        <form className={styles.container} onSubmit={onSubmit}>
            <div className={styles.field}>
                <div className={styles.expandedControl}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Search for a whisky"
                        value={searchQuery}
                        onChange={onChangeSearchQuery}
                    />
                </div>
                <div className={styles.control}>
                    <button className={styles.button}>
                        Search
                    </button>
                </div>
            </div>
        </form>
    )
};

import * as React from 'react';

import styles from './loader.module.scss';

export interface IProps {
    loading: boolean;
}

export const Loader: React.StatelessComponent<IProps> = ({ loading }) =>
    loading
        ? (
            <div className={styles.loader}>
                <span className={styles.text}>Loading…</span>
            </div>
        )
        : null;

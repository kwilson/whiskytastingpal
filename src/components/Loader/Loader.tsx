import * as React from 'react';

import './Loader.scss';

export interface IProps {
    loading: boolean;
}

export const Loader: React.StatelessComponent<IProps> = ({ loading }) =>
    loading
        ? (
            <div className="Loader is-loading">
                <span className="Loader__text">Loading…</span>
            </div>
        )
        : null;

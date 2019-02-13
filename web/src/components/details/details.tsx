import * as React from 'react';
import { IDetails } from '../../types/details';

import './details.scss';

export interface IProps {
    details: IDetails;
    onClose: () => void;
}

export const Details: React.StatelessComponent<IProps> = ({ details, onClose }) => (
    <div className="Details">
        {details.title}
        <hr />
        <button className="button" onClick={onClose}>Close</button>
    </div>
);

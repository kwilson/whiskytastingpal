import * as React from 'react';
import { IDetails } from '../../types/details';

import './details.scss';

export interface IProps {
    details: IDetails;
    onClose: () => void;
}

export const Details: React.StatelessComponent<IProps> = ({ details, onClose }) => (
    <article className="Details">
        <h1 className="title is-3">{details.title}</h1>

        {details.tastingNotes.map((notes) => (
            <>
                <h2 className="title is-5" key={notes.title}>{notes.title}</h2>
                <div className="content">
                    <p>{notes.value}</p>
                </div>
            </>
        ))}

        <img className="Details__image" src={details.image} alt="" />

        <hr />
        <button className="button is-primary" onClick={onClose}>Close</button>
    </article>
);

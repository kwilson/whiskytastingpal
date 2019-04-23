import * as React from 'react';
import { IExtendedDetails } from '../../types/details';

import './details.scss';

export interface IProps {
    details: IExtendedDetails;
    onClose: () => void;
}

export const Details: React.StatelessComponent<IProps> = ({ details, onClose }) => (
    <article className="Details">
        <div className="Details__content">
            <h1 className="title is-3">{details.title}</h1>

            {details.tastingNotes.map((notes) => (
                <React.Fragment key={notes.title}>
                    {Boolean(notes.title) && (<h2 className="title is-5">{notes.title}</h2>)}
                    <div className="content Details__notes">
                        <p>{notes.value}</p>
                    </div>
                </React.Fragment>
            ))}

            {details.tastingNotes.length === 0 && (
                <p>No tasting notes for this one, sorry.</p>
            )}

            <img className="Details__image" src={details.image} alt="" />

        </div>

        <hr className="Details__divider" />

        <p><a href={`https://masterofmalt.com/${details.url}`} target="_blank">View on Master of Malt</a></p>

        <hr className="Details__divider" />

        <button className="button is-primary" onClick={onClose}>Close</button>
    </article>
);

import * as React from 'react';
import { IExtendedDetails } from '../../types/details';

import styles from './details.module.scss';

export interface IProps {
    details: IExtendedDetails;
    onClose: () => void;
}

export const Details: React.StatelessComponent<IProps> = ({ details, onClose }) => (
    <article className={styles.details}>
        <div className={styles.whisky}>
            <h1 className={styles.title}>{details.title}</h1>

            {details.tastingNotes.map((notes) => (
                <React.Fragment key={notes.title}>
                    {Boolean(notes.title) && (<h2 className={styles.noteTitle}>{notes.title}</h2>)}
                    <div className={styles.content}>
                        <p>{notes.value}</p>
                    </div>
                </React.Fragment>
            ))}

            {details.tastingNotes.length === 0 && (
                <p>No tasting notes for this one, sorry.</p>
            )}

            <img className={styles.image} src={details.image} alt="" />

        </div>

        <hr className={styles.divider} />

        <p><a href={`https://masterofmalt.com/${details.url}`} target="_blank">View on Master of Malt</a></p>

        <hr className={styles.divider} />

        <button className={styles.closeButton} onClick={onClose}>Close</button>
    </article>
);

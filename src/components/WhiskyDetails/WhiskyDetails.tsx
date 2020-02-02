import * as React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { getDetails } from '../../data';
import { IWhiskyDetails } from '../../data/details';

import './WhiskyDetails.scss';
import { Loader } from '../Loader';

export const WhiskyDetails: React.FunctionComponent<{}> = () => {
    const { url } = useRouteMatch();
    const [details, setDetails] = React.useState<IWhiskyDetails | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);

        getDetails(url)
            .then(setDetails)
            .then(() => setIsLoading(false));
    }, [url]);

    return (
        <section className="section">
            <article className="Details">
                <Loader loading={isLoading} />

                {details && (
                    <>
                        <div className="Details__content">
                            <h1 className="title is-4">{details.title}</h1>

                            {details.notes.map((note) => (
                                <React.Fragment key={note.title}>
                                    {Boolean(note.title) && (<h2 className="title is-5">{note.title}</h2>)}
                                    <div className="content Details__notes">
                                        <p>{note.value}</p>
                                    </div>
                                </React.Fragment>
                            ))}

                            {details.notes.length === 0 && (
                                <p>No tasting notes for this one, sorry.</p>
                            )}

                            {details.description && (
                                <>
                                    <h2 className="title is-5">Description</h2>
                                    <div className="content Details__notes">
                                        <p>{details.description}</p>
                                    </div>
                                </>
                            )}

                            <img className="Details__image" src={details.image} alt="" />

                        </div>

                        <hr className="Details__divider" />

                        <p><a href={details.url} target="_blank">View on Master of Malt</a></p>
                    </>
                )}

                <hr className="Details__divider" />

                <Link to="/" className="button is-primary">Back to search results</Link>
            </article>
        </section>
    );
};

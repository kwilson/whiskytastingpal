import * as React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { getDetails } from '../../data';
import { IWhiskyDetails } from '../../data/details';

import './WhiskyDetails.scss';
import { Loader } from '../Loader';
import { Rating } from '../Rating';

export const WhiskyDetails: React.FunctionComponent<{}> = () => {
    const { url } = useRouteMatch();
    const [details, setDetails] = React.useState<IWhiskyDetails | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const hasMeta = details?.meta?.length;

    const showBackButton = Boolean(details) && !isLoading;

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
                        <div className="Details__content content">
                            <h1 className="title is-3">{details.title}</h1>

                            {details.notes.map((note) => (
                                <React.Fragment key={note.title}>
                                    {Boolean(note.title) && (<h2 className="title is-5">{note.title}</h2>)}
                                    <p>{note.value}</p>
                                </React.Fragment>
                            ))}

                            {details.notes.length === 0 && (
                                <p>No tasting notes for this one, sorry.</p>
                            )}

                            {details.description && (
                                <>
                                    <h2 className="title is-5">Description</h2>
                                    <p>{details.description}</p>
                                </>
                            )}

                            <img className="Details__image" src={details.image} alt="" />

                        </div>

                        {hasMeta && (
                            <>
                                <hr className="Details__divider" />

                                <div className="Details__content content">
                                    <h2 className="title is-5">Details</h2>

                                    <dd className="Details__meta">
                                        {details.meta.map(({ label, value }) => (
                                            <React.Fragment key={label}>
                                                <dt>{label}</dt>
                                                <dd>{value}</dd>
                                            </React.Fragment>
                                        ))}
                                    </dd>
                                </div>
                            </>
                        )}


                        {details.rating && (
                            <>
                                <hr className="Details__divider" />
                                <div className="Details__rating">
                                    <h2 className="title is-5">Rating</h2>

                                    <div className="Details__rating-value">
                                        <Rating rating={Number(details.rating)} />
                                    </div>
                                </div>
                            </>
                        )}

                        <hr className="Details__divider" />

                        <p><a href={details.url} target="_blank">View on Master of Malt</a></p>
                    </>
                )}

                <hr className="Details__divider" />

                {showBackButton && (
                    <Link to="/" className="button is-primary">Back to search results</Link>
                )}
            </article>
        </section>
    );
};

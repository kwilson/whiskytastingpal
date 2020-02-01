import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { getDetails } from '../../data';
import { IWhiskyDetails } from '../../data/details';

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
        <pre>
            {JSON.stringify({ details, isLoading }, null, 2)}
        </pre>
    );
};

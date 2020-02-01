import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';

export const WhiskyDetails: React.FunctionComponent<{}> = () => {
    const { url } = useRouteMatch();
    return (
        <pre>
            {JSON.stringify(url, null, 2)}
        </pre>
    );
};

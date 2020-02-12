import * as React from 'react';

interface IShareData {
    title?: string;
    text?: string;
    url: string;
}

export const ShareButton: React.FunctionComponent<IShareData> = (shareData) => {
    if (window.navigator && (window.navigator as any).share) {
        const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
            try {
                e.preventDefault();
                (window.navigator as any)['share'](shareData)
              } catch(err) {}
        }
        return (
            <button onClick={onClick} className="button is-primary">
                Share
            </button>
        );
    }

    return null;
};

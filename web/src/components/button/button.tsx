import * as React from 'react';
import classnames from 'classnames';

import styles from './button.module.scss';

export interface IProps extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> {
    primary?: boolean;
    info?: boolean;
    large?: boolean;
}

export const Button: React.StatelessComponent<IProps> = (props) => {
    const { children, className, primary, info, large, ...rest } = props;
    const css = classnames(
        styles.button,
        className,
        {
            [styles.primary]: primary,
            [styles.info]: info,
            [styles.large]: large,
        }
    );

    return (
        <button className={css} {...rest}>
            {children}
        </button>
    );
};

import { Link, LinkProps } from 'react-router-dom';
import { memo } from 'react';

import { classNames } from 'shared/lib/helpers';
import cls from './menuLink.module.scss';

export enum LinkThemes {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    PRIMARY_DARK = 'primary-dark',
    SECONDARY_DARK = 'secondary-dark',
}

export interface AppLinkProps extends LinkProps {
  classname?: string;
  variant?: string;
  to: string;
}

export const MenuLink = memo((props: AppLinkProps) => {
    const {
        to,
        children,
        variant,
        classname = '',
    } = props;

    return (
        <Link className={classNames(cls.navLink, {}, [classname, cls[variant]])} to={to}>
            {children}
        </Link>
    );
});

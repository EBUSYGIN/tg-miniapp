import React from 'react';
import cn from 'classnames';
import { TitleProps } from './Title.props';

import styles from './Title.module.css';

export function Title({ tag, size = 'm', className, children }: TitleProps) {
  return React.createElement(tag, {
    className: cn(styles.title, styles[size], className),
    children,
  });
}

import cn from 'classnames';

import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

export function Button({
  appearance = 'primary',
  className,
  children,
  size = 'm',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(styles.button, styles[size], styles[appearance], className)}
      {...props}
    >
      {children}
    </button>
  );
}

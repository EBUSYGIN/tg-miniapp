import cn from 'classnames';

import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

export function Button({
  appearance = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(styles.button, styles[appearance], className)}
      {...props}
    >
      {children}
    </button>
  );
}

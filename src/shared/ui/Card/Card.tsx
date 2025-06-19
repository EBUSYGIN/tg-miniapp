import cn from 'classnames';

import { CardProps } from './Card.props';
import styles from './Card.module.css';

export function Card({
  appearance = 'primary',
  className,
  children,
}: CardProps) {
  return (
    <div className={cn(styles.card, styles[appearance], className)}>
      {children}
    </div>
  );
}

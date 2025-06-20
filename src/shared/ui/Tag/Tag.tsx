import cn from "classnames";

import { TagProps } from "./Tag.props";
import styles from "./Tag.module.css";

export function Tag({
  size = "m",
  color = "primary",
  className,
  children,
}: TagProps) {
  return (
    <div className={cn(styles.tag, styles[size], styles[color], className)}>
      {children}
    </div>
  );
}

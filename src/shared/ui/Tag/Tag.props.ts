import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TagProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: "m" | "l";
  color?: "gray" | "red" | "green" | "primary" | "ghost";
}

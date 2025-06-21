import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  error?: string;
  label?: string;
}

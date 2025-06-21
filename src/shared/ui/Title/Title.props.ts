export interface TitleProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 's' | 'm';
}

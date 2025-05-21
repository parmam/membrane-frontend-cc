import { CSSProperties, ElementType, FunctionComponent, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './Typography.module.css';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

type Align = 'inherit' | 'left' | 'center' | 'right' | 'justify';
type Color = 'primary' | 'secondary' | 'error' | 'success' | 'inherit';

export interface TypographyProps {
  children?: ReactNode;
  className?: string;
  variant?: Variant;
  component?: ElementType;
  align?: Align;
  color?: Color;
  noWrap?: boolean;
  gutterBottom?: boolean;
  style?: CSSProperties;
}

const variantMapping: Record<Variant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
};

const Typography: FunctionComponent<TypographyProps> = (props) => {
  const {
    children,
    className,
    variant = 'body1',
    component,
    align,
    color = 'primary',
    noWrap,
    gutterBottom,
    style,
    ...rest
  } = props;

  const Component = component || variantMapping[variant] || 'span';

  const classNames = clsx(
    styles.typography,
    styles[variant],
    {
      [styles.center]: align === 'center',
      [styles.left]: align === 'left',
      [styles.right]: align === 'right',
      [styles.justify]: align === 'justify',
      [styles.primary]: color === 'primary',
      [styles.secondary]: color === 'secondary',
      [styles.error]: color === 'error',
      [styles.success]: color === 'success',
    },
    className,
  );

  const inlineStyles: CSSProperties = {
    ...(noWrap && {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    ...(gutterBottom && {
      marginBottom: '0.35em',
    }),
    ...style,
  };

  return (
    <Component className={classNames} style={inlineStyles} {...rest}>
      {children}
    </Component>
  );
};

export default Typography;

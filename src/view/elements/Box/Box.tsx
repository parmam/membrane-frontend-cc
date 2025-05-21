import { CSSProperties, FunctionComponent, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './Box.module.css';

type FlexDirection = 'row' | 'column';
type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';

export interface BoxProps {
  children?: ReactNode;
  className?: string;
  display?: 'flex' | 'block' | 'inline' | 'inline-block' | 'grid';
  flexDirection?: FlexDirection;
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  gap?: number | string;
  padding?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  margin?: number | string;
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  bgcolor?: string;
  color?: string;
  style?: CSSProperties;
}

const Box: FunctionComponent<BoxProps> = (props) => {
  const {
    children,
    className,
    display,
    flexDirection,
    flexWrap,
    justifyContent,
    alignItems,
    gap,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    bgcolor,
    color,
    style,
    ...rest
  } = props;

  const classNames = clsx(
    styles.box,
    {
      [styles.flexColumn]: flexDirection === 'column',
      [styles.flexRow]: flexDirection === 'row',
      [styles.flexWrap]: flexWrap === 'wrap',
      [styles.justifyStart]: justifyContent === 'flex-start',
      [styles.justifyCenter]: justifyContent === 'center',
      [styles.justifyEnd]: justifyContent === 'flex-end',
      [styles.justifyBetween]: justifyContent === 'space-between',
      [styles.justifyAround]: justifyContent === 'space-around',
      [styles.alignStart]: alignItems === 'flex-start',
      [styles.alignCenter]: alignItems === 'center',
      [styles.alignEnd]: alignItems === 'flex-end',
    },
    className,
  );

  const inlineStyles: CSSProperties = {
    display,
    gap,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    backgroundColor: bgcolor,
    color,
    ...style,
  };

  return (
    <div className={classNames} style={inlineStyles} {...rest}>
      {children}
    </div>
  );
};

export default Box;

import { ReactElement } from 'react';

const gaps = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  7: 'gap-7',
  8: 'gap-8',
  9: 'gap-9',
  10: 'gap-10',
};

type Props = {
  gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
  positionX?: 'left' | 'center' | 'right' | 'between' | 'around';
  positionY?: 'top' | 'center' | 'bottom';
  children: ReactElement;
};

export const Column = ({
  gap = '2',
  positionX = 'center',
  positionY = 'center',
  children,
}: Props) => {
  let className = {
    display: 'flex',
    gap: gaps[gap],
    justify: 'justify-center',
    items: 'items-center',
  };

  //PositionX
  if (positionX == 'left') {
    className['justify'] = 'justify-start';
  } else if (positionX == 'right') {
    className['justify'] = 'justify-end';
  } else if (positionX == 'between') {
    className['justify'] = 'justify-between';
  } else if (positionX == 'around') {
    className['justify'] = 'justify-around';
  }

  //PositionX
  if (positionY == 'top') {
    className['items'] = 'items-start';
  } else if (positionY == 'bottom') {
    className['items'] = 'items-end';
  }

  return <div className={Object.values(className).join(' ')}>{children}</div>;
};

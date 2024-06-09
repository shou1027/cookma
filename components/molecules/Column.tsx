import { ReactElement } from 'react';

type Props = {
  gap?: Gaps;
  positionX?: 'left' | 'center' | 'right' | 'between' | 'around';
  positionY?: 'top' | 'center' | 'bottom';
  children: ReactElement;
};

export const Column = ({
  gap = 'gap-2',
  positionX = 'center',
  positionY = 'center',
  children,
}: Props) => {
  let className = {
    display: 'flex',
    gap: gap,
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

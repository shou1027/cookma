import { ReactElement } from 'react';

type Props = {
  gap?: Gaps;
  positionX?: 'left' | 'center' | 'right';
  positionY?: 'top' | 'center' | 'bottom' | 'between' | 'around';
  children: ReactElement;
};

export const Row = ({
  gap = 'gap-2',
  positionX = 'center',
  positionY = 'center',
  children,
}: Props) => {
  let className = {
    display: 'flex flex-col',
    gap: gap,
    justify: 'justify-center',
    items: 'items-center',
  };

  //PositionX
  if (positionX == 'left') {
    className['items'] = 'items-start';
  } else if (positionX == 'right') {
    className['items'] = 'items-end';
  }

  //PositionY
  if (positionY == 'top') {
    className['justify'] = 'justify-start';
  } else if (positionY == 'bottom') {
    className['justify'] = 'justify-end';
  } else if (positionY == 'between') {
    className['justify'] = 'justify-between';
  } else if (positionY == 'around') {
    className['justify'] = 'justify-around';
  }

  return <div className={Object.values(className).join(' ')}>{children}</div>;
};

import { ReactElement } from 'react';

type Props = {
  onClick: () => void;
  children: ReactElement | string;
};

export const Button = ({ onClick, children }: Props) => {
  return <button onClick={onClick}>{children}</button>;
};

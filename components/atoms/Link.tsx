import { Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';
import { ReactElement } from 'react';

type Props = {
  href: string;
  children: ReactElement | ReactElement[] | string;
};

export const Link = ({ href, children }: Props) => {
  return (
    <MuiLink href={href} component={NextLink}>
      {children}
    </MuiLink>
  );
};

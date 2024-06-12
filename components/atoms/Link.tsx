import { Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof MuiLink>;

export const Link = (props: Props) => {
  if (props.href === undefined) {
    return <MuiLink href="/" component={NextLink} {...props}></MuiLink>;
  }

  return <MuiLink href={props.href} component={NextLink} {...props}></MuiLink>;
};

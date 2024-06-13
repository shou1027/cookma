import { ComponentProps } from 'react';
import { Link } from '../atoms/Link';

type Props = ComponentProps<typeof Link>;

export const OpacityLink = (props: Props) => {
  return (
    <Link
      sx={{
        transition: 'opacity 0.2s',
        '&:hover': { opacity: 0.8 },
        ...props.sx,
      }}
      {...props}
    />
  );
};

import { Stack, Typography } from '@mui/material';

type Props = {
  fixText: string;
  variableText: string;
  textWidth?: number | string;
  direction?: 'left' | 'right';
};

export const LiquidText = ({
  fixText,
  variableText,
  textWidth = '3em',
  direction = 'left',
}: Props) => {
  return (
    <Stack
      direction={direction == 'left' ? 'row' : 'row-reverse'}
      justifyContent="flex-start"
      textAlign={direction}
    >
      <Typography variant="caption" width={textWidth}>
        {fixText}
      </Typography>
      <Typography variant="caption">{variableText}</Typography>
    </Stack>
  );
};

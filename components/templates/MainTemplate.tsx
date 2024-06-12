import { ChildElement } from '@/types/ChildElement';
import { AppBar, Box, Toolbar } from '@mui/material';

type Props = {
  headerElement: ChildElement;
  mainElement: ChildElement;
};

export const MainTemplate = ({ headerElement, mainElement }: Props) => {
  return (
    <>
      <AppBar
        sx={{
          flexGrow: 1,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
        }}
      >
        <Toolbar sx={{ maxWidth: 1000, width: '100%', mx: 'auto' }}>
          {headerElement}
        </Toolbar>
      </AppBar>
      <Box pt={8} px={3} component="main">
        <Box maxWidth={1000} mx="auto" py={5}>
          {mainElement}
        </Box>
      </Box>
    </>
  );
};

import { Menu } from '@mui/icons-material';
import { Box, Button, Drawer, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box minWidth={200} />
      </Drawer>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => setOpen(true)}
      >
        <Menu />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        News
      </Typography>
      <Button color="inherit">Login</Button>
    </>
  );
};

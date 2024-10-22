import { useState } from 'react';

import { AppBar, Typography, Toolbar, Grow } from '@mui/material';

import MenuDrawer from '../MenuDrawer/MenuDrawer.jsx';
import AccountMenu from '../AccountMenu.jsx';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Grow in={true} timeout={1000}>
      <AppBar 
        position="static"
        sx={{
          backgroundColor: '#151b23',
          borderBottom: '1px solid #86888b',
          mb: 2,
        }}
      >
        <Toolbar>
          <MenuDrawer open={open} toggleDrawer={toggleDrawer}/>
          <Typography variant="h5" component="h5" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <AccountMenu handleMenu={handleMenu} handleClose={handleClose} anchorEl={anchorEl}/>
        </Toolbar>
      </AppBar>
    </Grow>
  );
}

import { IconButton, MenuItem, Grow, Divider, Menu  } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function AccountMenu({ handleMenu, handleClose, anchorEl }) {
  const ItemForMenu = ({ text, icon, index }) => (
    <Grow in={true} timeout={500 + index * 300}>
      <MenuItem
        onClick={handleClose}
        sx={{
          color: 'white',
          borderRadius: '5px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
          },
        }}
      >
        {icon}
        {text}
      </MenuItem>
    </Grow>
  );

  const logout = () => {
      localStorage.clear();
  }

  const items = [
    {
      text: 'Profile',
      icon: <AccountCircleIcon sx={{ mr: 2 }}/>,
    },
  ];

  return (
    <>
      <IconButton
        size="large"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#151b23',
            border: '1px solid #86888b',
            padding: '10px'
          },
        }}
      >
        {items.map((item, index) => (
          <ItemForMenu 
            key={index} 
            text={item.text} 
            icon={item.icon} 
            index={index} />
        ))}
        <Divider sx={{ backgroundColor: '#86888b' }} />
        <Grow in={Boolean(anchorEl)} timeout={700}>
          <MenuItem
            onClick={() => {
              handleClose();
              logout();
              window.location.reload();
            }}
            sx={{
              color: 'white',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: 'rgba(255, 0, 0, 0.3)',
                color: 'red',
              },
            }}
          >
            <LogoutIcon 
              fontSize="small" 
              sx={{ mr: 2 }} />
            Logout
          </MenuItem>
        </Grow>
      </Menu>
    </>
  );
}

export default AccountMenu;
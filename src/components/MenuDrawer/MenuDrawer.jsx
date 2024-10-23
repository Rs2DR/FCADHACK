import {  Box, Drawer, IconButton, List, Divider, Typography} from '@mui/material';
import ItemForList from '../ItemForList';

import MenuIcon from '@mui/icons-material/Menu';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import AbcRoundedIcon from '@mui/icons-material/AbcRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';

import styles from './MenuDrawer.module.css';

function MenuDrawer({ open, toggleDrawer }) {
  //поля для отрисовки в drawer
  const items = [
      {
        text:'Regular expressions',
        icon: <AbcRoundedIcon sx={{ color: 'white' }} fontSize='large'/>,
        path: 'regex',
      },
      {
        text:'Filtered messages',
        icon: <EmailRoundedIcon sx={{ color: 'white' }} fontSize='large'/>,
        path: 'filtered-messages',
      },
      {
        text:'Servers',
        icon: <StorageRoundedIcon sx={{ color: 'white' }} fontSize='large'/>,
        path: 'serves',
      },
      {
        text:'Settings',
        icon: <SettingsSuggestRoundedIcon sx={{ color: 'white' }} fontSize='large'/>,
        path: 'settings',
      },
      
  ]

  const DrawerList = (
    <Box
      className={styles.drawer}
      role="presentation">
      <Box 
        className={styles.drawerCaption} 
        sx={{p: '10px 0'}}>
        <Typography 
          variant="h5" 
          component="span" 
          sx={{color: 'white', ml: 2}}>
            Functional
        </Typography> 
        <IconButton 
          sx={{padding: 0, mr: 1}} 
          onClick={() => toggleDrawer(false)}>
          <DisabledByDefaultRoundedIcon sx={{color: 'white'}} fontSize='medium' />
        </IconButton>
      </Box>
      <Divider sx={{ backgroundColor: '#86888b' }} />
      <List sx={{padding: '10px'}}>
        {items.map((item, index) => (
          <ItemForList 
            key={index} 
            text={item.text} 
            icon={item.icon} 
            path={item.path} 
            index={index}
            open={open}
            toggleDrawer={toggleDrawer} />
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        onClose={() => toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}

export default MenuDrawer;
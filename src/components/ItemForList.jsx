import { Link } from 'react-router-dom';
import {  ListItem, ListItemButton, ListItemIcon, ListItemText, Grow} from '@mui/material';

function ItemForList ({ text, icon, path, index, toggleDrawer, open }) {
    return (
      <Grow in={open} timeout={500 + index * 300}>
        <Link to={path} style={{textDecoration:'none'}}>
        <ListItem sx={{
            mb: 1,
            borderRadius: '5px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
            },
          }}>
            <ListItemButton onClick={() => toggleDrawer(false)}>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
        </Link>
      </Grow>
    );
}

export default ItemForList;
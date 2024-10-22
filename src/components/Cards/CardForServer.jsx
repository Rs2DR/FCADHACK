import { IconButton, Box,Typography } from '@mui/material';
import StyledBadge from '../StyledBadge';

import DeleteIcon from '@mui/icons-material/Delete';
import StorageIcon from '@mui/icons-material/Storage';

function CardForServer ({ name, working, handleDelete, id }) {
    return (
        <Box
          sx={{
            border: '1px solid #86888b',
            borderRadius: '10px',
            padding: '10px',
            backgroundColor: '#1a2026',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            transition: '0.3s',
            '&:hover': {
              borderColor: '#1976d2',
            },
            '&:active': {
              borderColor: '#1565c0', 
            },
            cursor: 'pointer',
            position: 'relative'
          }}
        >
            <Box sx={{
              display:'flex', 
              flexDirection: 'row', 
              alignItems:'center', 
              justifyContent: 'center'}}>
                <StyledBadge icon={<StorageIcon sx={{color: 'white'}}/>} isTurnOn={working} />
                <Typography 
                    component='span' 
                    sx={{ color: 'white', fontSize: '14px', ml: 2}}
                >
                    {name}
                </Typography>
            </Box>
            <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(id); }}>
                <DeleteIcon color='error' />
            </IconButton>
        </Box>
    );
  };

export default CardForServer;
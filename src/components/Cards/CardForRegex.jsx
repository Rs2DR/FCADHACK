import { IconButton, Box,Typography } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';


function CardForRegex ({ regex, name, handleDelete, handleCopy }) {
    return (
      <Box
        sx={{
          border: '1px solid #86888b',
          borderRadius: '10px',
          padding: '10px',
          backgroundColor: '#1a2026',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
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
        onClick={() => handleCopy(regex)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            component='span'
            sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}
          >
            {name}
          </Typography>
          <Typography
            component='span'
            sx={{ color: 'lightgray', fontSize: '14px' }}
          >
            {regex}
          </Typography>
        </Box>
        <IconButton
          onClick={(e) => { e.stopPropagation(); handleDelete(name); }}
          sx={{ alignSelf: 'flex-end' }}
        >
          <DeleteIcon color='error' />
        </IconButton>
      </Box>
    );
  };

export default CardForRegex;
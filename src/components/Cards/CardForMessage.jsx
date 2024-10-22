import { IconButton, Box, Typography } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

function CardForMessage ({ message, handleCopy, handleDelete }) {
    return (
      <Box
        style={{
          border: '1px solid #86888b',
          borderRadius: '10px',
          padding: '15px',
          backgroundColor: '#1a2026',
          position: 'relative',
          transition: '0.3s',
          cursor: 'pointer',
        }}
        onClick={() => handleCopy(message)}
      >
        <Typography 
            component="pre" 
            sx={{ 
                color: 'white', 
                fontSize: '14px', 
                whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(message, null, 2)}
        </Typography>
        <IconButton
          onClick={(e) => { e.stopPropagation(); handleDelete(message._id?.$oid || message._id);}}
          sx={{ 
            position: 'absolute', 
            top: '10px', 
            right: '10px' }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
    );
  };
  
export default CardForMessage;
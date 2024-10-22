import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

function StyledBadge({icon, isTurnOn}) {
    let color;

    if(isTurnOn) {
        color = '#44b700';
    } else {
        color = 'red';
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: `${color}`,
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: `1px solid ${color}`,
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
    }));

  return (
    <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        {icon}
    </StyledBadge>
  )
}

export default StyledBadge
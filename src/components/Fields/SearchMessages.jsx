import { Button, Grow } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '40px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



function SearchField({ setSearchValue, setCurrentPage }) {
  const [value, setValue] = useState('');

  const handle = (event) => {
    setValue(event.target.value);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon sx={{ color: 'white' }} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={(event) => handle(event)}
      />
      <Grow in={!!value} timeout={600}>
        <Button 
          variant="contained" 
          color="success" 
          sx={{ ml: 2 }} 
          onClick={() => {
            setSearchValue(value);
            setCurrentPage(1);
          }}
        >
          Ок
        </Button>
      </Grow>
    </Search>
  );
}

export default SearchField;

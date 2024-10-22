import { Outlet, useNavigate } from 'react-router-dom';
import { Container, createTheme, CircularProgress} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
import { checkToken } from '../Requests/ForAuth.js';
import Header from '../components/Header/Header.jsx'

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: 'white',
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #0d1117 inset',
            WebkitTextFillColor: 'white',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#0d1117',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#86888b',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0d47a1',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white',
          fontWeight: '300',
          '&.Mui-focused': {
            fontWeight: '500',
          },
        },
      },
    },
  },
});

function AdminPage({ setIsLogin, isLogin }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const isValid = await checkToken(localStorage.getItem('token'));
      if (!isValid) {
        navigate('/auth/login');
      } else {
        setIsLogin(true);
      }
      setLoading(false);
    };

    verifyToken();
  }, [navigate, setIsLogin]);

  if (loading) {
    return (
      <Container
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        maxWidth='md'>
          <CircularProgress sx={{ color: 'white' }} />
      </Container>      
    );
  } else if(isLogin){
    return (
      <ThemeProvider theme={theme}>
        <Header />
        <Container
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
          maxWidth='md'>
          <Outlet />
        </Container>
      </ThemeProvider>
    );
  }

}

export default AdminPage;

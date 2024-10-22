import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Box, Button, Container, TextField, Typography, ThemeProvider, createTheme, Grow, CircularProgress } from "@mui/material";
import FieldForSecret from "../../components/Fields/FieldForSecret";

import VisibilityIcon from  "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import VpnKeyOffIcon from "@mui/icons-material/VpnKeyOff";
import WeekendIcon from "@mui/icons-material/Weekend";

import { registration } from "../../Requests/ForAuth";

import { SnackbarProvider, useSnackbar } from 'notistack';

import styles from './styles.module.css';

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

function RegistrationPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onSubmit"
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false); 

  const errorAlert = (text) => {
    return enqueueSnackbar(text, {
      variant: 'error', 
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
    });
  }

  const onSubmit = async (formData) => {
    setIsLoading(true);
    const req = {
      "user_data": {
        "email": formData.Email,
        "password": formData.Password
      },
      "admin_password_to_check": formData.Key
    };

    try {
      const res = await registration(req);
      if (res) {
        enqueueSnackbar(`Success! Вы зарегистрированы!`, {
          variant: 'success', 
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
        navigate('/admin/regex');
      } else {
        errorAlert('Error! Проверте ключ!');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        errorAlert(err.response.data.message || 'Ошибка регистрации');
      } else {
        errorAlert('Ошибка сети или сервер недоступен!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grow in={true} timeout={1100}>
        <Container 
          maxWidth="sm" 
          className={styles.containerWrapper}>
          <WeekendIcon fontSize="large" sx={{ mb: 2, color: 'white' }} />
          <Typography 
            variant="h5" 
            fontWeight="100" 
            sx={{ mb: 2, color: 'white' }}>
            Sign up to Admin Panel
          </Typography>
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className={styles.boxWrapper} 
            style={{ marginBottom: '20px' }}>
            <TextField
              label="Email"
              variant="outlined"
              sx={{ mb: 3, width: 1 }}
              {...register('Email', {
                required: "required to fill out",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email",
                },
              })}
              error={!!errors?.Email}
              helperText={errors?.Email?.message}
            />
            <FieldForSecret
              register={register}
              error={!!errors?.Password}
              helperText={errors?.Password?.message}
              visabilityOff={<VisibilityOffIcon sx={{ color: '#86888b' }} />}
              visabilityOn={<VisibilityIcon sx={{ color: '#86888b' }} />}
              type={'Password'}
            />
            <FieldForSecret
              register={register}
              error={!!errors?.Key}
              helperText={errors?.Key?.message}
              visabilityOff={<VpnKeyOffIcon sx={{ color: '#86888b' }} />}
              visabilityOn={<VpnKeyIcon sx={{ color: '#86888b' }} />}
              type={'Key'}
            />
            <Button
              variant="contained"
              sx={{ width: 1, backgroundColor: '#238636' }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign up'}
            </Button>
          </form>
          <Box>
            <Typography 
              component="span" 
              fontWeight="100" 
              sx={{ color: 'white' }}>
                Has account? 
            </Typography>
            <Link to="/auth/login" style={{ textDecoration: 'none' }}>
              <Typography
                component="span"
                sx={{ 
                  color: '#4493f8', 
                  ":hover": { 
                    textDecorationLine: 'underline', 
                    color: '#1976d2' 
                  }, 
                  ":active": { 
                    color: '#0d47a1' 
                  } }}>
                Login an account
              </Typography>
            </Link>
          </Box>
        </Container>
      </Grow>
    </ThemeProvider>
  );
}

const Page = () => {
  return (
    <SnackbarProvider 
      maxSnack={2} 
      autoHideDuration={1000}
    >
      <RegistrationPage />
    </SnackbarProvider>
  );
}

export default Page;

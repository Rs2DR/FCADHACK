import { useForm } from "react-hook-form"; 
import { useEffect, useState } from 'react';

import { Box, Typography, Grow, Button, TextField, FormControl, FormControlLabel, Radio, RadioGroup, Switch } from "@mui/material";

import { SnackbarProvider, useSnackbar } from 'notistack';

import { getSettings, updateSettings } from "../../Requests/ForSettings"; 

import styles from './styles.module.css';

function RegexPage() {
  const { register, handleSubmit, setValue } = useForm(); 
  const [selectedValue, setSelectedValue] = useState('removeSensitiveFields');
  const [settings, setSettings] = useState({}); 
  const { enqueueSnackbar } = useSnackbar(); 

  useEffect(() => {
    getSettings().then(fetchedSettings => {
      setSettings(fetchedSettings);
      setValue('maskingSymbols', fetchedSettings.maskingSymbols)
      if (fetchedSettings.maskSensitiveMessages) {
        setSelectedValue('maskSensitiveMessages');
      } else if (fetchedSettings.removeSensitiveFields) {
        setSelectedValue('removeSensitiveFields');
      } else if (fetchedSettings.blockSensitiveMessages) {
        setSelectedValue('blockSensitiveMessages');
      }
    });
  }, []);

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value); 
  };

  const onSubmit = async (data) => {
    try {
      const result = {
        maskSensitiveMessages: selectedValue === 'maskSensitiveMessages', 
        removeSensitiveFields: selectedValue === 'removeSensitiveFields',
        blockSensitiveMessages: selectedValue === 'blockSensitiveMessages',
        maskingSymbols: data.maskingSymbols, 
        saveSensitiveEmail: data.saveSensitiveEmail,
      };

      console.debug(result);
      await updateSettings(result); 
      enqueueSnackbar(`Настройки успешно сохранены!`, { 
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    } catch (err) {
      enqueueSnackbar(`Не удалось сохранить настройки!`, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    }
  };

  const descriptions = {
    removeSensitiveFields: 'Данная настройка будет удалять поля в сообщении с чувствительными и персональными данными',
    blockSensitiveMessages: 'Данная настройка отключает отправку сообщений, в которых есть чувствительные и персональные данные',
    maskSensitiveMessages: 'Данная настройка будет заменять чувствительные и персональные данные на  маскировочный символ. Пример: "Моя почта email@gmai.com". При использовании маскировочного символа "###" станет: "Моя ###"',
  };

  return (
    <Grow in={true} timeout={1100}>
      <Box className={styles.boxWrapper}>
        <Grow in={true} timeout={2000}>
          <Box sx={{ display: 'flex', mb: 3 }}>
            <Typography variant="h5" component="h5" className={styles.title}>
              Settings
            </Typography>
          </Box>
        </Grow>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
          <Box
            className={styles.container}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{ width: 1, mb: 2 }}>
              <TextField
                sx={{ width: 1 }}
                variant='outlined'
                label='Masking Symbols'
                defaultValue='???'
                {...register('maskingSymbols', { required: "Это поле обязательно" })}
              />
            </Box>
            <FormControl sx={{ width: 1 }}>
              <Typography sx={{ fontSize: '20px', color: 'white', mb: 2 }}>Filter types</Typography>
              <RadioGroup value={selectedValue} onChange={handleRadioChange}>
                {['removeSensitiveFields', 'blockSensitiveMessages', 'maskSensitiveMessages'].map((value) => (
                  <FormControlLabel
                    key={value}
                    className={styles.box}
                    sx={{
                      m: '0 0 15px 10px',
                      backgroundColor: '#151b23',
                      color: 'white',
                    }}
                    value={value}
                    control={<Radio color='success' />}
                    label={value.charAt(0).toUpperCase() + value.slice(1).replace(/([A-Z])/g, ' $1')}
                  />
                ))}
              </RadioGroup>
              <FormControlLabel
                className={styles.box}
                sx={{
                  m: '0 0 15px 10px',
                  backgroundColor: '#151b23',
                  color: 'white',
                }}
                control={<Switch {...register('saveSensitiveEmail')} defaultChecked={settings.saveSensitiveEmail} color='success' />}
                label="Save Sensitive Email"
              />
              <Button variant='contained' color='success' onClick={handleSubmit(onSubmit)}>Confirm</Button>
            </FormControl>
          </Box>
          <Box
            className={styles.box}
            sx={{
              flex: 1,
              backgroundColor: '#2d333b',
            }}
          >
            <Typography sx={{ color: 'white' }}>
              {descriptions[selectedValue]}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Grow>
  );
}

const Page = () => {
  return (
    <SnackbarProvider maxSnack={2} autoHideDuration={1000}>
      <RegexPage />
    </SnackbarProvider>
  );
}

export default Page;

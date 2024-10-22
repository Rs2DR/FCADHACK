import { useState, useEffect } from 'react';
import { Box, Typography, Grow, TextField, Button } from '@mui/material';
import SearchField from '../../components/Fields/SearchField';
import RegexField from '../../components/Fields/RegexField';
import CardForServer from '../../components/Cards/CardForServer';

import { SnackbarProvider, useSnackbar } from 'notistack';
import { getAllServers, addServer, deleteServer, pingServer } from '../../Requests/ForServer'; 
import styles from './styles.module.css';

function ServerPage() {
  const [serverArray, setServerArray] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [newServerName, setNewServerName] = useState('');
  const [newServerURL, setNewServerURL] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const servers = await getAllServers();
        setServerArray(servers);
      } catch (err) {
        enqueueSnackbar('Ошибка загрузки серверов!', { 
          variant: 'error', 
          anchorOrigin: { 
            vertical: 'bottom', 
            horizontal: 'right' 
          } 
        });
      }
    };

    fetchServers();
  }, []);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const updatedServers = await Promise.all(
          serverArray.map(async (server) => {
            const response = await pingServer();
            return { ...server, working: response === 'pong' };
          })
        );
        setServerArray(updatedServers);
      } catch (err) {
        enqueueSnackbar('Ошибка проверки статуса серверов!', { 
          variant: 'error', 
          anchorOrigin: { 
            vertical: 'bottom', 
            horizontal: 'right' 
          } 
        });
      }
    };

    if (serverArray.length > 0) {
      checkServerStatus();
    }
  }, [serverArray]);

  const handleDelete = async (id) => {
    try {
      await deleteServer(id);
      const newServerArray = serverArray.filter(server => server.id !== id);
      setServerArray(newServerArray);
      enqueueSnackbar('Сервер успешно удален из списка!', { 
        variant: 'success', 
        anchorOrigin: { 
          vertical: 'bottom', 
          horizontal: 'right' 
        } 
      });
    } catch (error) {
      enqueueSnackbar('Не удалось удалить сервер из списка!', { 
        variant: 'error', 
        anchorOrigin: { 
          vertical: 'bottom', 
          horizontal: 'right' 
        } 
      });
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleAddServer = async () => {
    const newServer = { name: newServerName, url: newServerURL };
    try {
      const addedServer = await addServer(newServer);
      setServerArray(prev => [...prev, addedServer]);
      setNewServerName('');
      setNewServerURL('');
      enqueueSnackbar('Сервер успешно добавлен!', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Не удалось добавить сервер!', {
        variant: 'error',
      });
    }
  };

  const filteredServers = serverArray.filter(server =>
    server.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Grow in={true} timeout={1100}>
      <Box className={styles.boxWrapper} maxWidth='sm'>
        <Grow in={true} timeout={1500}>
          <Box sx={{ display: 'flex', mb: 3 }}>
            <Typography variant='h6' component='h6' className={styles.title}>
              Servers
            </Typography>
            <SearchField handleChange={handleChange} />
          </Box>
        </Grow>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 2fr', md: '1fr 3fr' },
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label='Name'
            value={newServerName}
            onChange={(e) => setNewServerName(e.target.value)}
            sx={{ width: 1 }}
          />
          <RegexField
            text={'URL of server'}
            value={newServerURL}
            onChange={(e) => setNewServerURL(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddServer}>
            Добавить сервер
          </Button>
        </Box>
        <Grow in={true} timeout={2000}>
          <Box
            className={`${styles.box} ${styles.scrollBar}`}
            sx={{
              backgroundColor: '#2d333b',
              height: { xs: '300px', sm: '570px' },
            }}
          >
            {filteredServers.length === 0 ? (
              <Typography className={styles.empty}>
                Unfortunately empty
              </Typography>
            ) : (
              filteredServers.map(server => (
                <CardForServer
                  key={server.id}
                  name={server.name}
                  working={server.working} // Используем обновленное состояние
                  id={server.id}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </Box>
        </Grow>
      </Box>
    </Grow>
  );
}

const Page = () => (
  <SnackbarProvider maxSnack={2} autoHideDuration={1000}>
    <ServerPage />
  </SnackbarProvider>
);

export default Page;

import { useState, useEffect } from 'react';
import { Box, Typography, Grow, TextField } from '@mui/material';
import SearchField from '../../components/Fields/SearchField';
import FieldWithIcons from '../../components/Fields/FieldWithIcons';
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

  // Загрузка всех серверов при первом рендере
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
  }, [enqueueSnackbar]);

  // Проверка статуса серверов (запускаем при первой загрузке и при обновлении serverArray)
  useEffect(() => {
    const checkServerStatus = async () => {
      console.log(serverArray);
      try {
        const updatedServers = await Promise.all(
          serverArray.map(async (server) => {
            const response = await pingServer(server.url); 
            return { ...server, working: response === true }; 
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
      checkServerStatus(); // Только если серверы есть
    }
  }, [serverArray, enqueueSnackbar]); // Включаем enqueueSnackbar как зависимость

  // Удаление сервера
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

  // Добавление нового сервера
  const handleAddServer = async () => {
    const newServer = { id: 0, name: newServerName, url: newServerURL };
    try {
      const isAdded = await addServer(newServer);
      if (isAdded) {
        // Если сервер успешно добавлен, добавляем его в список
        setServerArray(prev => [...prev, { ...newServer, working: false }]); 
        setNewServerName('');
        setNewServerURL('');
        enqueueSnackbar('Сервер успешно добавлен!', { 
          variant: 'success', 
          anchorOrigin: { 
            vertical: 'bottom', 
            horizontal: 'right' 
          } 
        });
      }
    } catch (error) {
      enqueueSnackbar('Не удалось добавить сервер!', { 
        variant: 'error', 
        anchorOrigin: { 
          vertical: 'bottom', 
          horizontal: 'right' 
        } 
      });
    }
  };

  // Фильтрация серверов по поисковому запросу
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
            <SearchField handleChange={(e) => setSearchValue(e.target.value)} />
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
          <FieldWithIcons
            text={'URL of server'}
            value={newServerURL}
            onChange={(e) => setNewServerURL(e.target.value)}
            handleAdd={handleAddServer}
            clear={() => {
              setNewServerName(''); 
              setNewServerURL('');    
            }}
          />
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

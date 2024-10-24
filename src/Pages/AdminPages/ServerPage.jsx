import { useState, useEffect } from 'react';
import { Box, Typography, Grow, TextField } from '@mui/material';
import SearchField from '../../components/Fields/SearchField';
import FieldWithIcons from '../../components/Fields/FieldWithIcons';
import CardForServer from '../../components/Cards/CardForServer';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { getAllServers, addServer, deleteServer, pingServer } from '../../Requests/ForServer'; 
import styles from './styles.module.css';

function ServerPage() {
  const [servArray, setServArray] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [newServerName, setNewServName] = useState('');
  const [newServerURL, setNewServURL] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  // Загрузка всех серверов при первом рендере
  useEffect(() => {
    const fetchServs = async () => {
      try {
        const servs = await getAllServers();
        setServArray(servs);
        // После загрузки серверов запускаем проверку их статусов
        checkServerStatus(servs);
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

    fetchServs();
  }, [enqueueSnackbar]);

  const checkServerStatus = async (servers) => {
    try {
      const updatedServs = [];

      // Проверяем каждый сервер по очереди
      for (let serv of servers) {
        const response = await pingServer(serv.url);
        updatedServs.push({ ...serv, working: response === true });
      }

      setServArray(updatedServs);
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

  const handleDelete = async (id) => {
    try {
      await deleteServer(id);
      const newServerArray = servArray.filter(serv => serv.id !== id);
      setServArray(newServerArray);
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

  const handleAddServer = async () => {
    if(newServerName && newServerURL) {
    const newServer = { id: 0, name: newServerName, url: newServerURL };
    try {
      const isAdded = await addServer(newServer);
      if (isAdded) {
        const updatedServerArray = [...servArray, { ...newServer, working: false }];
        setServArray(updatedServerArray);
        checkServerStatus(updatedServerArray);
        setNewServName('');
        setNewServURL('');
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
  } else {
    enqueueSnackbar('Имя!', { 
      variant: 'warning', 
      anchorOrigin: { 
        vertical: 'bottom', 
        horizontal: 'right' 
      } 
    });
  }
  }
  ;

  const filteredServers = servArray.filter(serv =>
    serv.name.toLowerCase().includes(searchValue.toLowerCase())
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
            onChange={(e) => setNewServName(e.target.value)}
            sx={{ width: 1 }}
          />
          <FieldWithIcons
            text={'URL of server'}
            value={newServerURL}
            onChange={(e) => setNewServURL(e.target.value)}
            handleAdd={handleAddServer}
            clear={() => {
              setNewServName(''); 
              setNewServURL('');    
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
              filteredServers.map(serv => (
                <CardForServer
                  key={serv.id}
                  name={serv.name}
                  working={serv.working} 
                  id={serv.id}
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

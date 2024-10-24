import { useState, useEffect } from 'react';

import { Box, Typography, Grow, TextField, Pagination } from "@mui/material";

import FiledWithIcons from '../../components/Fields/FieldWithIcons';
import SearchField from '../../components/Fields/SearchField';
import CardForRegex from '../../components/Cards/CardForRegex';

import { SnackbarProvider, useSnackbar } from 'notistack';

import { addRegex, getAllRegexes, removeRegex } from '../../Requests/ForRegex'; 

import styles from './styles.module.css';

function RegexPage() {
  const [regexArray, setRegexArray] = useState([]);
  const [newRegexName, setNewRegexName] = useState(''); 
  const [newRegexPattern, setNewRegexPattern] = useState(''); 
  const [searchValue, setSearchValue] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getAllRegexes()
    .then(regexes => {
      const splitedRegexes = regexes.map(item => {
        const [name, pattern] = item.split(":");
        return { name, pattern };
      });
      setRegexArray(splitedRegexes); 
    })
      .catch(() => {
      enqueueSnackbar('Ошибка получения регулярных выражений!', { 
          variant: 'error', 
          anchorOrigin: { 
            vertical: 'bottom', 
            horizontal: 'right' 
          } 
        });
      });
  }, [enqueueSnackbar]);
  

  const handleAddRegex = async () => {
    if (!newRegexName || !newRegexPattern) {
      enqueueSnackbar('Имя и шаблон регулярного выражения обязательны!', { 
        variant: 'warning', 
        anchorOrigin: { 
          vertical: 'bottom', 
          horizontal: 'right' 
        } 
      });
      return;
    }

    try {
      await addRegex(newRegexName, newRegexPattern);
      setRegexArray(prevArray => [...prevArray, { name: newRegexName, pattern: newRegexPattern }]);
      enqueueSnackbar('Регулярное выражение успешно добавлено!', { 
        variant: 'success', 
        anchorOrigin: { 
          vertical: 'bottom', 
          horizontal: 'right' 
        } 
      });
      setNewRegexName('');
      setNewRegexPattern('');
    } catch (err) {
      enqueueSnackbar('Не удалось добавить регулярное выражение!', { 
        variant: 'error', 
        anchorOrigin: { 
          vertical: 'bottom', 
          horizontal: 'right' 
        } 
      });
    }
  };

  const handleDelete = async (name) => {
    try {
      await removeRegex(name);
      setRegexArray(prevArray => prevArray.filter(regex => regex.name !== name));
      enqueueSnackbar('Регулярное выражение успешно удалено!', { 
        variant: 'success', 
        anchorOrigin: { 
          vertical: 'bottom', 
          horizontal: 'right' 
        } 
      });
    } catch (err) {
      enqueueSnackbar('Не удалось удалить регулярное выражение!', { 
        variant: 'error', 
        anchorOrigin: { 
          vertical: 'bottom', 
          horizontal: 'right' 
        } 
      });
    }
  };

  const handleCopy = (regex) => {
    navigator.clipboard.writeText(regex)
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  const filteredRegexArray = regexArray.filter((regex) =>
    regex.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
    regex.pattern.toLowerCase().includes(searchValue)
  );

  const paginatedRegexArray = filteredRegexArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Grow in={true} timeout={1100}>
      <Box className={styles.boxWrapper}>
        <Grow in={true} timeout={1500}>
          <Box>
            <Grow in={true} timeout={2000}>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography
                  variant="h6"
                  component="h6"
                  className={styles.title}>
                  Regular expressions
                </Typography>
                <SearchField handleChange={handleChange} />
              </Box>
            </Grow>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 2fr',
                  md: '1fr 3fr'
                },
                gap: 2,
                mb: 2
              }}
            >
              <TextField
                label='Name of regex'
                value={newRegexName}
                onChange={(e) => setNewRegexName(e.target.value)}
                sx={{ width: 1 }}
              />
              <FiledWithIcons
                text={'New regular expression'}
                value={newRegexPattern}
                onChange={(e) => setNewRegexPattern(e.target.value)} 
                handleAdd={handleAddRegex}
                clear={() => {
                  setNewRegexPattern(''); 
                  setNewRegexName('');    
                }}
              />
            </Box>
            <Grow in={true} timeout={2500}>
              <Box
                className={`${styles.box} ${styles.scrollBar}`}
                sx={{
                  height: {
                    xs: `calc(69vh * 0.6)`, 
                    sm: `clamp(400px, 10vw + 45vh, 500px)`,
                    md: `calc(100vh * 0.5)`,
                  },
                  backgroundColor: '#2d333b',
                }}
                
              >
                {paginatedRegexArray.length === 0 ? (
                  <Typography className={styles.empty}>
                    Unfortunately empty
                  </Typography>
                ) : (
                  paginatedRegexArray.map((obj, index) => (
                    <CardForRegex 
                      key={index} 
                      regex={obj.pattern} 
                      name={obj.name} 
                      index={index}
                      handleDelete={handleDelete}
                      handleCopy={handleCopy} />
                  ))
                )}
              </Box>
            </Grow>
          </Box>
        </Grow>
        <Grow in={true} timeout={2600} >
          <Pagination
            count={99999}
            page={currentPage}
            boundaryCount={0}
            siblingCount={3}
            onChange={handlePageChange}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
              '& .MuiPaginationItem-root': {
                color: 'white', // Цвет текста кнопок
                borderColor: '#86888b', // Цвет границы кнопок
                backgroundColor: '#1a2026', // Задний фон обычных кнопок
              },
              '& .Mui-selected': {
                backgroundColor: '#3a4452', // Задний фон активной кнопки
                color: 'white', // Цвет текста активной кнопки
                borderColor: '#2d333b', // Граница активной кнопки
              },
              '& .MuiPaginationItem-root:hover': {
                borderColor: '#1976d2', // Задний фон кнопок при наведении
              }
            }}
            variant="outlined"
            shape="rounded"
          />
        </Grow>
      </Box>
    </Grow>
  );
}

const Page = () => (
  <SnackbarProvider maxSnack={2} autoHideDuration={1000}>
    <RegexPage />
  </SnackbarProvider>
);

export default Page;

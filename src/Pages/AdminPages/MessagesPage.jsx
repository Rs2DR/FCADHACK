import { useEffect, useState, useMemo } from "react";

import { Box, Typography, Grow, Pagination } from "@mui/material";
import SearchField from "../../components/Fields/SearchField";
import CardForMessage from "../../components/Cards/CardForMessage";

import { deleteMessage, getMessages } from "../../Requests/ForMessage";

import { SnackbarProvider, useSnackbar } from 'notistack';

import styles from './styles.module.css';

function MessagePage() {
  const [messages, setMessages] = useState([]);

  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getMessages(itemsPerPage, currentPage)
    .then(messages => setMessages(messages))
    .catch(err => {
      console.error("Ошибка получения сообщений:", err);
    });
  }, [currentPage])

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      setMessages(prevMessages => prevMessages.filter(message => message._id?.$oid !== id && message._id !== id));
      enqueueSnackbar(`Сообщение удалено!`, { 
        variant: 'success', 
        anchorOrigin: { 
          vertical: 'bottom', 
          horizontal: 'right' 
        } 
      });
    } catch (err) {
      enqueueSnackbar(`Не удалось удалить сообщение!`, { 
        variant: 'error', 
        anchorOrigin: { 
          vertical: 'bottom', 
          horizontal: 'right' 
        } 
      });
    }
  };

  const handleCopy = (jsonObject) => {
    navigator.clipboard.writeText(JSON.stringify(jsonObject, null, 2))
      .then(() => {
        console.log("JSON copied to clipboard:", jsonObject);
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
      });
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
  };

  const filterMessages = (messages) => {
    if (!searchValue) return messages;

    return messages.filter(message => {
      return Object.keys(message).some(key =>
        String(message[key]).toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  };

  const filteredMessages = useMemo(() => filterMessages(messages), [messages, searchValue]);
  const pageCount = Math.ceil(filteredMessages.length / itemsPerPage);
  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  return (
    <Grow in={true} timeout={1100}>
      <Box className={styles.boxWrapper}>
        <Grow in={true} timeout={1500}>
          <Box sx={{ display: 'flex', mb: 3 }}>
            <Typography
              variant="h6"
              component="h6"
              className={styles.title}>
              Filtered messages
            </Typography>
            <SearchField handleChange={handleChange} />
          </Box>
        </Grow>
        <Grow in={true} timeout={2500}>
          <Box
            className={`${styles.box} ${styles.scrollBar}`}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gridAutoRows: 'auto',
              gap: '10px',
              backgroundColor: '#2d333b',
              height: '500px',
            }}
          >
            {paginatedMessages.length === 0 ? (
              <Typography className={styles.empty}>
              Unfortunately empty
            </Typography>
            ) : (
              paginatedMessages.map((message) => (
                <CardForMessage 
                  key={message._id?.$oid || message._id}
                  message={message}
                  handleCopy={handleCopy}
                  handleDelete={handleDelete} />
              ))
            )}
          </Box>
        </Grow>
        <Grow in={true} timeout={2600} >
        <Pagination
          count={pageCount}
          page={currentPage}
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

const Page = () => {
  return (
    <SnackbarProvider
      maxSnack={2}
      autoHideDuration={1000}
    >
      <MessagePage />
    </SnackbarProvider>
  );
};

export default Page;

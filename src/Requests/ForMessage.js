import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const getMessages = async (itemsPerPage, currentPage) => {
  try {
    const res = await axios.get(`${baseURL}/api/messages`, {
      params: {
        pageSize: itemsPerPage,
        pageNumber: currentPage,
      },
    });
    sessionStorage.setItem('messagesCount', res.headers.total);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка получения сообщений');
  }
};

export const deleteMessage = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/api/messages/${id}`);
    return res.status === 200;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка удаления сообщения');
  }
};

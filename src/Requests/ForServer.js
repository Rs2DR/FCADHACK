import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const getAllServers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/servers`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка получения списка серверов');
  }
};

export const addServer = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/servers`, data);
    return res.status === 201;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка добавления сервера');
  }
};

export const deleteServer = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/api/servers/${id}`);
    return res.status === 204;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка удаления сервера');
  }
};

export const pingServer = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/ping`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка при тестировании сервера');
  }
};

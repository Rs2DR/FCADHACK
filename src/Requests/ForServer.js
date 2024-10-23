import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const getAllServers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/servers`);
    return res.data;
  } catch (err) {
    console.error('Ошибка получения списка серверов:', err);
    throw new Error('Ошибка получения списка серверов');
  }
};

export const addServer = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/servers`, data);
    return [200, 201, 203, 204].includes(res.status);
  } catch (err) {
    console.error('Ошибка добавления сервера:', err);
    throw new Error('Ошибка добавления сервера');
  }
};

export const deleteServer = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/api/servers/${id}`);
    return [200, 201, 203, 204].includes(res.status);
  } catch (err) {
    console.error('Ошибка удаления сервера:', err);
    throw new Error('Ошибка удаления сервера');
  }
};

export const pingServer = async (url) => {
  try {
    const res = await axios.get(`${url}/api/ping`);
    return [200, 201, 203, 204].includes(res.status);
  } catch (err) {
    console.error('Ошибка при тестировании сервера:', err);
    throw new Error('Ошибка при тестировании сервера');
  }
};

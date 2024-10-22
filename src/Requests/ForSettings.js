import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const updateSettings = async (settings) => {
  try {
    const res = await axios.post(`${baseURL}api/settings/update`, settings);
    return res.status === 200;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка обновления настроек');
  }
};

export const getSettings = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/settings/current `);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка получения настроек');
  }
};

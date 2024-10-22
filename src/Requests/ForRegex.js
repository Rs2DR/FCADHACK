import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const addRegex = async (name, pattern) => {
  try {
    const res = await axios.post(`${baseURL}/api/regex/add`, JSON.stringify({ name, pattern }));
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка добавления регулярного выражения');
  }
};

export const removeRegex = async (name) => {
  try {
    const res = await axios.delete(`${baseURL}/api/regex/remove`, {
      params: { name },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка удаления регулярного выражения');
  }
};

export const getAllRegexes = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/regex/all`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка получения регулярного выражения');
  }
};

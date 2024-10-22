import axios from 'axios';

const authURL = process.env.REACT_APP_AUTH_URL;

export const login = async (data) => {
  try {
    console.log('Auth URL:', authURL);
    const res = await axios.post(`${authURL}/users/login`, data);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка входа');
  }
};

export const registration = async (data) => {
  try {
    const res = await axios.post(`${authURL}/users/register`, data);
    const token = await login(res);
    localStorage.setItem('token', token);
    return true;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка регистрации');
  }
};

export const checkToken = async (data) => {
  try {
    const res = await axios.get(`${authURL}/users/check_token`, {
      params: { token: data },
    });
    return res.status === 200;
  } catch (err) {
    console.error(err);
    throw new Error('Ошибка проверки токена');
  }
};

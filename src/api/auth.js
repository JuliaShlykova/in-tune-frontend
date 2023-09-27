import axios from 'axios';

export const login = async(data) => {
  try {
    console.log('env: ', process.env.REACT_APP_API_URL)
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch(err) {
    if (err.response.status===401) {
      return {error: err.response.data};
    }
    console.log(err.message);
  }
}

export const signup = async(data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch(err) {
    if (err.response.status.toString().startsWith('4')) {
      return err.response.data;
    }
    console.log(err.message);
  }
}
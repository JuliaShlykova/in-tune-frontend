import Cookies from "js-cookie"; 

export const removeLocalKey = (key) => {
  localStorage.removeItem(key);
}

export const setLocalValue = (key, value) => {
  localStorage.setItem(key, value);
}

export const getLocalValue = (key) => {
  return localStorage.getItem(key);
}

export const clearLocal = () => {
  if (Cookies.get('token')||Cookies.get('user')) {
    Cookies.remove('token');
    Cookies.remove('user');
  }
  localStorage.clear();
}
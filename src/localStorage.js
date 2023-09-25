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
  localStorage.clear();
}
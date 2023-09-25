export const setImgHeaders = () => {
  const token = localStorage.getItem('token');
  return ({
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
}

const setHeaders = () => {
  const token = localStorage.getItem('token');
  return ({
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}

export default setHeaders;
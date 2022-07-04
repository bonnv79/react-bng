export const getUrl = (path) => {
  const SERVER_URL = process.env.REACT_APP_API_URL;
  console.log('REACT_APP_API_URL', process.env.REACT_APP_API_URL);
  return `${SERVER_URL}${path}`;
}
export const getUrl = (path) => {
  const SERVER_URL = process.env.WEB_URL || 'https://express-bng-dev.vercel.app';
  console.log('WEB_URL', process.env.WEB_URL);
  return `${SERVER_URL}${path}`;
}
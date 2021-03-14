// General configs

export default {
  url: 'http://localhost', // Front-end's URL
  env: process.env.ENV || 'development',
  port: process.env.EXPRESSPORT || 5000,
  secretKey: process.env.JWTKEY || '',
  expiresIn: '7d',
};

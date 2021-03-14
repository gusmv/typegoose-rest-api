// General configs

export default {
  port: process.env.PORT || 5000,
  url: 'http://localhost', // Front-end's URL
  secretKey: process.env.KEY || '',
  expiresIn: '7d',
};

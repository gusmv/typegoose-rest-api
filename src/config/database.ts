export default {
  mongodb: {
    debug: true,
    uri: process.env.MONGOURI || 'mongodb://localhost/rest-api',
  },
  redisdb: {
    host: process.env.REDISHOST || '',
    port: process.env.REDISPORT || '',
  },
};

// You can use Ethereal Mail (https://ethereal.email/) on dev environment.

export default {
  config: {
    host: process.env.SMTPHOST || '',
    port: process.env.SMTPPORT || '',
    auth: {
      user: process.env.SMTPUSER || '',
      pass: process.env.SMTPPASS || '',
    },
  },
  from: {
    address: 'restapi@example.com',
    name: 'REST API Mail',
  },
};

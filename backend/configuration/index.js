if (process.env.NODE_ENV === 'test') {
  module.exports = {
    JWT_SECRET: '#D$E^&J8&h6g%#$dVgbfh%4#DF%^7u*IJUMGF',
    oauth: {
      google: {
        clientID: 'number',
        clientSecret: 'string',
      },
      facebook: {
        clientID: 'number',
        clientSecret: 'string',
      },
    },
  };
} else {
  module.exports = {
    JWT_SECRET: '#D$E^&J8&h6g%#$dVgbfh%4#DF%^7u*IJUMGF',
    oauth: {
      google: {
        clientID: 'number',
        clientSecret: 'string',
      },
      facebook: {
        clientID: 'number',
        clientSecret: 'string',
      },
    },
  };
}
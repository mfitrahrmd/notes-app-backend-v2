/* eslint-disable max-len */
const routes = require('./routes');
const AuthenticationsHandler = require('./handler');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server, { authenticationsService, usersService, tokenManager }) => {
    const authenticationsHandler = new AuthenticationsHandler(authenticationsService, usersService, tokenManager);

    server.route(routes(authenticationsHandler));
  },
};

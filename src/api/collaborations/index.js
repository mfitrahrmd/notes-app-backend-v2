const routes = require('./routes');
const CollaborationsHandler = require('./handler');

module.exports = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (server, { collaborationsService, notesService }) => {
    const collaborationsHandler = new CollaborationsHandler(collaborationsService, notesService);

    server.route(routes(collaborationsHandler));
  },
};

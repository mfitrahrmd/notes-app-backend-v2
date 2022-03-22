const UploadsHandler = require('./handler');
const validator = require('../../validator/uploads');
const routes = require('./routes');

module.exports = {
  name: 'uploads',
  version: '1.0.0',
  register: async (server, { storageService }) => {
    const uploadsHandler = new UploadsHandler(storageService, validator);

    server.route(routes(uploadsHandler));
  },
};

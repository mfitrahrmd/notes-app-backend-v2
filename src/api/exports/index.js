const routes = require('./routes');
const ExportsHandler = require('./handler');

module.exports = {
  name: 'exports',
  version: '1.0.0',
  register: async (server, { producerService }) => {
    const exportsHandler = new ExportsHandler(producerService);

    server.route(routes(exportsHandler));
  },
};

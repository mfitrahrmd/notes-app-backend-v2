const Hapi = require('@hapi/hapi');
// Notes Service Plugin
const notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesService');
// Users Service Plugin
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');

const errorHandler = require('./serverExtensions/errorHandler');
require('dotenv').config();

const init = async () => {
  const notesService = new NotesService();
  const usersService = new UsersService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: notes,
      options: {
        service: notesService,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
      },
    },
  ]);

  server.ext({
    type: 'onPreResponse',
    method: errorHandler,
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();

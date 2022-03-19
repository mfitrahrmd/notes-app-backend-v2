const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// Notes Service Plugin
const notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesService');

// Users Service Plugin
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');

// Authentications Service Plugin
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');

// Collaborations Service Plugin
const collaborations = require('./api/collaborations');
const CollaborationsService = require('./services/postgres/CollaborationsService');

const errorHandler = require('./serverExtensions/errorHandler');
require('dotenv').config();

const init = async () => {
  const usersService = new UsersService();
  const collaborationsService = new CollaborationsService(usersService);
  const notesService = new NotesService(collaborationsService);
  const authenticationsService = new AuthenticationsService();

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
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('notesapp_jwt', 'jwt', {
    keys: process.env.JWT_ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.JWT_ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
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
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
      },
    },
    {
      plugin: collaborations,
      options: {
        collaborationsService,
        notesService,
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

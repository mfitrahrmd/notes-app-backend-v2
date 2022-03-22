const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const path = require('path');

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

// Exports Service Plugin
const _exports = require('./api/exports');
const ProducerService = require('./services/rabbitmq/ProducerService');

// Uploads File Service Plugin
const uploads = require('./api/uploads');
const StorageService = require('./services/storage/StorageService');

// Redis Cache Service
const CacheService = require('./services/redis/CacheService');

const errorHandler = require('./serverExtensions/errorHandler');
require('dotenv').config();

const init = async () => {
  const usersService = new UsersService();
  const cacheService = new CacheService();
  const collaborationsService = new CollaborationsService(usersService, cacheService);
  const notesService = new NotesService(collaborationsService, cacheService);
  const authenticationsService = new AuthenticationsService();
  const storageService = new StorageService(path.resolve(__dirname, 'api/uploads/file/images'));

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
    {
      plugin: Inert,
    },
  ]);

  server.auth.strategy('notesapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
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
    {
      plugin: _exports,
      options: {
        producerService: ProducerService,
      },
    },
    {
      plugin: uploads,
      options: {
        storageService,
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

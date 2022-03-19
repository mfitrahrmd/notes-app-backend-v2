const { postUserValidator } = require('../../validator/users');

const routes = (handler) => [
  {
    path: '/users',
    method: 'POST',
    handler: handler.postUserHandler,
    config: {
      validate: postUserValidator,
    },
  },
  {
    path: '/users/{id}',
    method: 'GET',
    handler: handler.getUserByIdHandler,
  },
  {
    path: '/users',
    method: 'GET',
    handler: handler.getUsersByUsernameHandler,
  },
];

module.exports = routes;

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
];

module.exports = routes;

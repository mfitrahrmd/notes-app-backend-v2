const { UserPayloadSchema } = require('../../validator/users/schema');
const InvariantError = require('../../exeptions/InvariantError');

const routes = (handler) => [
  {
    path: '/users',
    method: 'POST',
    handler: handler.postUserHandler,
    config: {
      validate: {
        payload: UserPayloadSchema,
        options: {
          abortEarly: false,
        },
        failAction(request, h, err) {
          if (err.isJoi) {
            throw new InvariantError(err.message);
          }
          return h.continue;
        },
      },
    },
  },
  {
    path: '/users/{id}',
    method: 'GET',
    handler: handler.getUserByIdHandler,
  },
];

module.exports = routes;

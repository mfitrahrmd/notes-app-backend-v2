const { postCollaborationValidator } = require('../../validator/collaborations');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.postCollaborationHandler,
    config: {
      auth: 'notesapp_jwt',
      validate: postCollaborationValidator,
    },
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.deleteCollaborationHandler,
    config: {
      auth: 'notesapp_jwt',
    },
  },
];

module.exports = routes;

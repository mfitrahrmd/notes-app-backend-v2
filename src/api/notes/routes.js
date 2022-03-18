const { postNoteValidator, putNoteValidator } = require('../../validator/notes');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.postNoteHandler,
    config: {
      auth: 'notesapp_jwt',
      validate: postNoteValidator,
    },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler,
    config: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteByIdHandler,
    config: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.putNoteByIdHandler,
    config: {
      auth: 'notesapp_jwt',
      validate: putNoteValidator,
    },
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteByIdHandler,
    config: {
      auth: 'notesapp_jwt',
    },
  },
];

module.exports = routes;

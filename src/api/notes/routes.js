const { NotePayloadSchema } = require('../../validator/notes/schema');
const InvariantError = require('../../exeptions/InvariantError');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.postNoteHandler,
    config: {
      validate: {
        payload: NotePayloadSchema,
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
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.putNoteByIdHandler,
    config: {
      validate: {
        payload: NotePayloadSchema,
        options: {
          abortEarly: false,
        },
        failAction: (request, h, err) => {
          if (err.isJoi) {
            throw new InvariantError(err.message);
          }
          return h.continue;
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteByIdHandler,
  },
];

module.exports = routes;

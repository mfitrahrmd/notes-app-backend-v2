const { exportNotesValidator } = require('../../validator/exports');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/export/notes',
    handler: handler.postExportNotesHandler,
    options: {
      auth: 'notesapp_jwt',
      validate: exportNotesValidator,
    },
  },
];

module.exports = routes;

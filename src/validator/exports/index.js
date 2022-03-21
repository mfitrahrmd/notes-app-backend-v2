const { ExportNotesPayloadSchema } = require('./schema');
const InvariantError = require('../../exeptions/InvariantError');

const exportNotesValidator = {
  payload: ExportNotesPayloadSchema,
  options: {
    abortEarly: false,
  },
  failAction(request, h, err) {
    if (err.isJoi) {
      throw new InvariantError(err.message);
    }
    return h.continue;
  },
};

module.exports = { exportNotesValidator };

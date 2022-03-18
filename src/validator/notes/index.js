const { PostNotePayloadSchema, PutNotePayloadSchema } = require('./schema');
const InvariantError = require('../../exeptions/InvariantError');

const postNoteValidator = {
  payload: PostNotePayloadSchema,
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

const putNoteValidator = {
  payload: PutNotePayloadSchema,
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

module.exports = { postNoteValidator, putNoteValidator };

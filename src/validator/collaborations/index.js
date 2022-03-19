const { PostCollaborationPayloadSchema } = require('./schema');
const InvariantError = require('../../exeptions/InvariantError');

const postCollaborationValidator = {
  payload: PostCollaborationPayloadSchema,
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

module.exports = { postCollaborationValidator };

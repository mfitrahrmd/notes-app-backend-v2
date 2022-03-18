const { PostUserPayloadSchema } = require('./schema');
const InvariantError = require('../../exeptions/InvariantError');

const postUserValidator = {
  payload: PostUserPayloadSchema,
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

module.exports = { postUserValidator };

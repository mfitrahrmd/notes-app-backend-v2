const { PostAuthenticationPayloadSchema, PutAuthenticationPayloadSchema, DeleteAuthenticationPayloadSchema } = require('./schema');
const InvariantError = require('../../exeptions/InvariantError');

const postAuthenticationValidator = {
  payload: PostAuthenticationPayloadSchema,
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

const putAuthenticationValidator = {
  payload: PutAuthenticationPayloadSchema,
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

const deleteAuthenticationValidator = {
  payload: DeleteAuthenticationPayloadSchema,
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

module.exports = {
  postAuthenticationValidator,
  putAuthenticationValidator,
  deleteAuthenticationValidator,
};

const ClientError = require('../exeptions/ClientError');

module.exports = (request, h) => {
  const { response } = request;

  if (response instanceof ClientError) {
    return h
      .response({
        status: 'fail',
        message: response.message,
      })
      .code(response.statusCode);
  }

  return h.continue;
};

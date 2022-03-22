const path = require('path');

const routes = (handler) => [
  {
    path: '/upload/images',
    method: 'POST',
    handler: handler.postUploadImageHandler,
    config: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },
  {
    path: '/upload/{param*}',
    method: 'GET',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
      },
    },
  },
];

module.exports = routes;

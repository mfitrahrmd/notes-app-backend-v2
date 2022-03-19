class UsersHandler {
  constructor(service) {
    this._service = service;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
    this.getUsersByUsernameHandler = this.getUsersByUsernameHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const userId = await this._service.addUser(request.payload);

    return h
      .response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
      })
      .code(201);
  }

  async getUserByIdHandler(request, h) {
    const { id } = request.params;

    const user = await this._service.getUserById(id);

    return h.response({
      status: 'success',
      data: {
        user,
      },
    });
  }

  async getUsersByUsernameHandler(request, h) {
    const { username = '' } = request.query;

    const users = await this._service.getUsersByUsername(username);

    return h.response({
      status: 'success',
      data: {
        users,
      },
    });
  }
}

module.exports = UsersHandler;

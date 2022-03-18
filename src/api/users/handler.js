class UsersHandler {
  constructor(service) {
    this._service = service;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const { username, password, fullname } = request.payload;

    const userId = await this._service.addUser({ username, password, fullname });

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
}

module.exports = UsersHandler;

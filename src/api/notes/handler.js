const ClientError = require('../../exeptions/ClientError');

class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  async postNoteHandler(request, h) {
    try {
      this._validator.validateNotePayload(request.payload);
      const { title = 'untitled', body, tags } = request.payload;
      const noteId = await this._service.addNote({ title, body, tags });

      return h
        .response({
          status: 'success',
          message: 'Catatan berhasil ditambahkan',
          data: {
            noteId,
          },
        })
        .code(201);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode);
      }

      // Server ERROR
      console.error(error);
      return h
        .response({
          status: 'error',
          message: 'Maaf, terjadi kegagalan pada server kami.',
        })
        .code(500);
    }
  }

  async getNotesHandler(request, h) {
    const notes = await this._service.getNotes();

    return h
      .response({
        status: 'success',
        data: {
          notes,
        },
      })
      .code(200);
  }

  async getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const note = await this._service.getNoteById(id);

      return h
        .response({
          status: 'success',
          data: {
            note,
          },
        })
        .code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode);
      }

      // Server ERROR
      console.error(error);
      return h
        .response({
          status: 'error',
          message: 'Maaf, terjadi kegagalan pada server kami.',
        })
        .code(500);
    }
  }

  async putNoteByIdHandler(request, h) {
    try {
      this._validator.validateNotePayload(request.payload);
      const { id } = request.params;
      const { title, body, tags } = request.payload;

      await this._service.editNoteById(id, { title, body, tags });

      return h
        .response({
          status: 'success',
          message: 'Catatan berhasil diperbarui',
        })
        .code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode);
      }

      // Server ERROR
      console.error(error);
      return h
        .response({
          status: 'error',
          message: 'Maaf, terjadi kegagalan pada server kami.',
        })
        .code(500);
    }
  }

  async deleteNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;

      await this._service.deleteNoteById(id);

      return h
        .response({
          status: 'success',
          message: 'Catatan berhasil dihapus',
        })
        .code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode);
      }

      // Server ERROR
      console.error(error);
      return h
        .response({
          status: 'error',
          message: 'Maaf, terjadi kegagalan pada server kami.',
        })
        .code(500);
    }
  }
}

module.exports = NotesHandler;

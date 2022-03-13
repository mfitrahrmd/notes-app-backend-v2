class NotesHandler {
  constructor(service) {
    this._service = service;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  postNoteHandler(request, h) {
    try {
      const { title = 'untitled', body, tags } = request.payload;
      const noteId = this._service.addNote({ title, body, tags });

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
      return h
        .response({
          status: 'fail',
          message: error.message,
        })
        .code(400);
    }
  }

  getNotesHandler(request, h) {
    const notes = this._service.getNotes();

    return h
      .response({
        status: 'success',
        data: {
          notes,
        },
      })
      .code(200);
  }

  getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const note = this._service.getNoteById(id);

      return h
        .response({
          status: 'success',
          data: {
            note,
          },
        })
        .code(200);
    } catch (error) {
      return h
        .response({
          status: 'fail',
          message: error.message,
        })
        .code(404);
    }
  }

  putNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { title, body, tags } = request.payload;

      this._service.editNoteById(id, { title, body, tags });

      return h
        .response({
          status: 'success',
          message: 'Catatan berhasil diperbarui',
        })
        .code(200);
    } catch (error) {
      return h
        .response({
          status: 'fail',
          message: error.message,
        })
        .code(404);
    }
  }

  deleteNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;

      this._service.deleteNoteById(id);

      return h
        .response({
          status: 'success',
          message: 'Catatan berhasil dihapus',
        })
        .code(200);
    } catch (error) {
      return h
        .response({
          status: 'fail',
          message: error.message,
        })
        .code(404);
    }
  }
}

module.exports = NotesHandler;

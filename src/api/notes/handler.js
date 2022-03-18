class NotesHandler {
  constructor(service) {
    this._service = service;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  async postNoteHandler(request, h) {
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
  }

  async putNoteByIdHandler(request, h) {
    const { id } = request.params;
    const { title, body, tags } = request.payload;

    await this._service.editNoteById(id, { title, body, tags });

    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      })
      .code(200);
  }

  async deleteNoteByIdHandler(request, h) {
    const { id } = request.params;

    await this._service.deleteNoteById(id);

    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      })
      .code(200);
  }
}

module.exports = NotesHandler;

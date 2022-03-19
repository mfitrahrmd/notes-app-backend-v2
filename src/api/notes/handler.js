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
    const { id: credentialId } = request.auth.credentials;

    const noteId = await this._service.addNote({ ...request.payload, credentialId });

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
    const { id: credentialId } = request.auth.credentials;

    const notes = await this._service.getNotes(credentialId);

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
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyNoteAccess(id, credentialId);

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
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyNoteAccess(id, credentialId);

    await this._service.editNoteById(id, request.payload);

    return h
      .response({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      })
      .code(200);
  }

  async deleteNoteByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyNoteOwner(id, credentialId);

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

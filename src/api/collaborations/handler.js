class CollaborationsHandler {
  constructor(collaborationsService, notesService) {
    this._collaborationsService = collaborationsService;
    this._notesService = notesService;

    this.postCollaborationHandler = this.postCollaborationHandler.bind(this);
    this.deleteCollaborationHandler = this.deleteCollaborationHandler.bind(this);
  }

  async postCollaborationHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { noteId, userId } = request.payload;

    await this._notesService.verifyNoteOwner(noteId, credentialId);

    const collaborationId = await this._collaborationsService.addCollaboration(noteId, userId);

    return h
      .response({
        status: 'success',
        message: 'Kolaborasi berhasil ditambahkan',
        data: {
          collaborationId,
        },
      })
      .code(201);
  }

  async deleteCollaborationHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { noteId, userId } = request.payload;

    await this._notesService.verifyNoteOwner(noteId, credentialId);

    await this._collaborationsService.deleteCollaboration(noteId, userId);

    return h
      .response({
        status: 'success',
        message: 'Kolaborasi berhasil dihapus',
      })
      .code(200);
  }
}

module.exports = CollaborationsHandler;

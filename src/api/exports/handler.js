class ExportsHandler {
  constructor(producerService) {
    this._producerService = producerService;

    this.postExportNotesHandler = this.postExportNotesHandler.bind(this);
  }

  async postExportNotesHandler(request, h) {
    const message = {
      userId: request.auth.credentials.id,
      targetEmail: request.payload.targetEmail,
    };

    await this._producerService.sendMessage('export:notes', JSON.stringify(message));

    return h
      .response({
        status: 'success',
        message: 'Permintaan Anda dalam antrean',
      })
      .code(201);
  }
}

module.exports = ExportsHandler;

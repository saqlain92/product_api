const mongoose = require('mongoose');
class ErrorHandler extends Error {
    constructor( message) {
      super();
      Error.captureStackTrace(this, this.constructor);
      this.message = message;
    }
  }

  const handleError = (err, res) => {

    if(err instanceof mongoose.Error) {
      res.status(404).json({
        status: "error",
        message : "mongoose error",
        kind : err.kind,
      });
      }
  
    const { message } = err;
    res.status(404).json({
      status: "error",
      message,
      err
    });
  };

  module.exports = {
    ErrorHandler,
    handleError
  }
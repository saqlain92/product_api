const mongoose = require('mongoose');
const jwt      = require('jsonwebtoken');
class ErrorHandler extends Error {
  constructor(status, success, message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    this.status = status;
    this.success = success;
  }
}

const handleError = (err, res) => {

  if (err instanceof mongoose.Error) {
    
    res.status(500).json({  
      status: "error",
      message: "mongoose error",
      kind: err.kind,
    });
  }
  else {
    const { message, status, success } = err;
    res.status(status || 500).json({
      success: success,
      status: "error",
      message,
    });
  }
};

module.exports = {
  ErrorHandler,
  handleError
}
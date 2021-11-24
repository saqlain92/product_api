const mongoose = require('mongoose');
const jwt      = require('jsonwebtoken');
class ErrorHandler extends Error {
  constructor(status, success, message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = status;
    this.success = success;
    this.message = message;
  }
}

const handleError = (err, res) => {

  if (err instanceof mongoose.Error) {
    
    res.status(500).json({  
      status: "error",
      message: err || "mongoose error",
      kind: err.kind,
    });
  }
  else {
    const { status, success, message } = err;
    res.status(status || 500).json({
      status: status,
      success: success,
      message: message || err,
    });
  }
};

module.exports = {
  ErrorHandler,
  handleError
}
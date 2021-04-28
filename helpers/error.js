class ErrorHandler extends Error {
    constructor( message) {
      super();
      this.message = message;
    }
  }

  const handleError = (err, res) => {
    const { statusCode, message } = err;
    res.status(404).json({
      status: "error",
      message
    });
  };

  module.exports = {
    ErrorHandler,
    handleError
  }
class CustomError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  const createError = (statusCode, message) => new CustomError(statusCode, message);
  
  module.exports = createError;
  
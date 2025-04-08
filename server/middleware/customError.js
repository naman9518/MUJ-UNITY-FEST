//Extended the Error class so that it can take more inputs
class CustomError extends Error {
  constructor(
    message = "Error message not provided to CustomError! Some unexpected Error caught",
    statusCode = 500
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = "CustomError";
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;

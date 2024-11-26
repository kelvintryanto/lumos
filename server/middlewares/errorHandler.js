const errorHandler = (error, req, res, next) => {
  let message = "Internal Server Error";
  let status = 500;

  if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = error.errors[0].message;
  }

  if (error.name === "SequelizeDatabaseError" || error.name === "SequelizeForeignKeyConstraintError") {
    status = 400;
    message = "Invalid input";
  }

  if (error.name === "JsonWebTokenError") {
    message = "Invalid token";
    status = 400;
  }

  if (error.name === "BadRequest") {
    status = 400;
    message = "Please input email or password";
  }

  if (error.name === "Unauthorized") {
    message = "Please login first";
    status = 401;
  }

  if (error.name === "LoginError") {
    status = 401;
    message = "Invalid email or password";
  }

  if (error.name === "Forbidden") {
    message = "You are not allowed";
    status = 403;
  }

  if (error.name === "NotFound") {
    status = 404;
    message = `Data with id ${error.id} not found`;
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;

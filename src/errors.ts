import { NextFunction, Request, Response } from "express";
import { IError } from "./types";


class GeneralError extends Error {
  message;
  logMessage;
  statusCode;
  serviceName;

  constructor({statusCode, message, logMessage, serviceName}: IError) {
      super();
      this.message = message ? message : 'General error';
      this.logMessage = logMessage ? logMessage : 'General error';
      this.statusCode = statusCode ? statusCode : null;
      this.serviceName = serviceName ? serviceName : null;
  }
}

class NotFound extends GeneralError {
  constructor(error: IError) {
      super({
          statusCode: 404,
          message: error.message || 'Not found',
          logMessage: error.logMessage || 'Not found',
          serviceName: error.serviceName,
      });
  }
}

class InputError extends GeneralError {
  constructor(error: IError) {
    super({
        statusCode: 400,
        message: error.message || 'Invalid format',
        logMessage: error.logMessage || 'Invalid format',
        serviceName: error.serviceName,
    });
  }
}
class InvalidBodyError extends GeneralError {
  constructor(error: IError) {
    super({
        statusCode: 400,
        message: error.message || 'Invalid body parameters',
        logMessage: error.logMessage || 'Invalid body parameters',
        serviceName: error.serviceName,
    });
  }
}

class SequelizeError extends GeneralError {
  constructor(error: IError) {
    super({
        statusCode: error.statusCode || 500,
        message: error.message || 'Sequelize Error',
        logMessage: error.logMessage || 'Sequelize Error',
        serviceName: error.serviceName,
    });
  }
}

class SequelizeUniqueConstraintError extends GeneralError {
  constructor(error: IError) {
    super({
        statusCode: error.statusCode || 409,
        message: error.message || 'Unique field duplicated',
        logMessage: error.logMessage || 'Unique field duplicated',
        serviceName: error.serviceName,
    });
  }
}

const errorHandler = (err: IError, _req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(err.statusCode || 500).send({
      success: false,
      message: err.message || "Internal Server Error",
    });
}

export {
  GeneralError,
  NotFound,
  InputError,
  SequelizeError,
  SequelizeUniqueConstraintError,
  errorHandler,
  InvalidBodyError
}
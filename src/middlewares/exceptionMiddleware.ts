import { Request, Response, NextFunction } from 'express';
import ExepctionHandling from '../errors/ExceptionHandling';

function exceptionGlobalHandling(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
): Response {
  if (error instanceof ExepctionHandling) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}

export default exceptionGlobalHandling;

import { StatusCodes } from 'http-status-codes';

import { signInService, signUpService } from '../services/userService.js';
import {
  customErrorResponse,
  internalServerErrorResponse,
  successResponse
} from '../utils/common/responseObjects.js';

export const signUp = async (req, res) => {
  try {
    const user = await signUpService(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(user, 'user created successfully!!'));
  } catch (error) {
    console.log(`user controller error:`, error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};

export const signIn = async (req, res) => {
  try {
    const response = await signInService(req.body);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'User signed in successfully!!'));
  } catch (error) {
    console.log('User Controller error:', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};
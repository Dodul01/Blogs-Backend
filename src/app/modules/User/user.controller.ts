import { Request, Response } from 'express';
import { userValidation } from './user.validation';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodParseedUser = userValidation.userValidationSchema.parse(user);
    // sending default value for isBlocked
    const userData = { ...zodParseedUser, isBlocked: false as const };
    const result = await UserService.createUserIntoDB(userData);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      statusCode: 201,
      result,
      data: {
        _id: result._id,
        name: result.name,
        email: result.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      statusCode: 400,
      error: error,
      stack: (error as Error).stack,
    });
  }
};

export const UserController = {
  createUser,
};

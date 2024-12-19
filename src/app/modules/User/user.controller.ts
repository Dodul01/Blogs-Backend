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
      data: result,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const UserController = {
  createUser,
};

import { Request, Response } from 'express';
import { AdminServices } from './admin.service';

const blockUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await AdminServices.blockUserFromDB(
    userId,
    req.body.isBlocked,
  );

  res.status(200).json({
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
    result,
  });
};

const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminServices.deleteBlogFromDB(id);

  res.status(200).json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: 200,
    result,
  });
};

export const AdminController = {
  blockUser,
  deleteBlog,
};

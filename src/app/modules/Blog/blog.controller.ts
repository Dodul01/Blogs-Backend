import { Request, Response } from 'express';
import { BlogServices } from './blog.service';

const createBlog = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = (req as any).user;

  const result = await BlogServices.createBlogIntoDB(req.body, user);
  res.status(201).json({
    success: true,
    message: 'Blog created successfully',
    statusCode: 201,
    data: result,
  });
};

export const BlogController = {
  createBlog,
};

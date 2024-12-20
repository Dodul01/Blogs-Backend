import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { BlogServices } from './blog.service';
import { BlogValidation } from './blog.validation'; // Ensure correct path
import { z } from 'zod';

const createBlog = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = (req as any).user;
    const data = {
      title: req.body.title,
      content: req.body.content,
      author: new Types.ObjectId(user._id),
      isPublished: true,
    };

    const validatedPayload =
      BlogValidation.createBlogValidationSchema.parse(data);

    const result = await BlogServices.createBlogIntoDB(validatedPayload, user);

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        statusCode: 400,
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        statusCode: 500,
        error: error,
      });
    }
  }
};

const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = (req as any).user;

    const data = {
      title: req.body.title,
      content: req.body.content,
      author: new Types.ObjectId(user._id),
      isPublished: true,
    };

    // Validateing the request data using Zod
    const validatedPayload =
      BlogValidation.updateBlogValidationSchema.parse(data);

    // Calling the service function to update the blog
    const result = await BlogServices.updateBlogIntoDB(
      id,
      validatedPayload,
      user,
    );

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        statusCode: 400,
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        statusCode: 500,
        error: error,
      });
    }
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = (req as any).user;

    const result = await BlogServices.deleteBlogFromDB(id, user);

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      statusCode: 500,
      error: error,
    });
  }
};

const getAllBlogs = async (req: Request, res: Response) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: 200,
    data: result,
  });
};

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};

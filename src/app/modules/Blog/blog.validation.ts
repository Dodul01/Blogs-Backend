import { Types } from 'mongoose';
import { z } from 'zod';

const createBlogValidationSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.instanceof(Types.ObjectId),
  isPublished: z.boolean().default(true),
});

const updateBlogValidationSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  author: z.instanceof(Types.ObjectId),
  isPublished: z.boolean(),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};

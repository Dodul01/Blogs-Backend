import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createBlogIntoDB = async (payload: TBlog, user: any) => {
  const item = {
    title: payload.title,
    content: payload.content,
    author: user._id,
  };
  
  const result = (await Blog.create(item)).populate('author', '-password');
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
};

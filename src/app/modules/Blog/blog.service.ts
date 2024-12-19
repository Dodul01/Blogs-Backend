import { TBlog } from './Blog.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createBlogIntoDB = async (payload: TBlog, user: any) => {
  console.log(payload); // payload data from request
  console.log(user); // jwt data 
  
};

export const BlogServices = {
  createBlogIntoDB,
};
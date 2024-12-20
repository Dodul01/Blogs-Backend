import { User } from '../User/user.model';
import { BlogSearchableFields } from './blog.constant';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateBlogIntoDB = async (
  id: string,
  payload: Partial<TBlog>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any,
) => {
  // console.log(id);
  // console.log(payload);
  // console.log(user);

  // Check if the blog exists
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new Error('The blog you are trying to update dose not exist.');
  }

  // Check if the user is the author of the blog
  const isAuthor = blog.author.equals(user._id);

  if (!isAuthor) {
    throw new Error('You are not authorized to update this blog.');
  }

  // check if the user is blocked or not
  const isUserBlocked = await User.findOne({ _id: user._id });

  if (isUserBlocked?.isBlocked) {
    throw new Error('You account is blocked. You can not update this blog.');
  }

  // if everything is fine update the blog
  const result = await Blog.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true },
  ).populate('author', '-password');

  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteBlogFromDB = async (id: string, user: any) => {
  // console.log(id);
  // console.log(user);
  // check if the blog exists
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new Error('The blog you are trying to delete dose not exist.');
  }
  // check if the user is the author of the blog or admin
  const isAuthor = blog.author.equals(user._id);
  const isAdmin = user.role === 'admin';

  if (!isAuthor && !isAdmin) {
    throw new Error('You are not authorized to delete this blog.');
  }

  // check if the user is blocked or not
  const isBlocked = await User.findOne({ _id: user._id });

  if (isBlocked?.isBlocked) {
    throw new Error('You account is blocked. you can not delete this blog.');
  }

  // if everything is fine delete the blog

  const result = await Blog.findByIdAndDelete(id).populate(
    'author',
    '-password',
  );
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const {
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    filter,
  } = query as {
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    filter?: string;
  };

  const searchCondition = search
    ? {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        $or: BlogSearchableFields.map((field: any) => ({
          [field]: { $regex: search, $options: 'i' }, // Case-insensitive regex search
        })),
      }
    : {};

  const filterCondition = filter ? { author: filter } : {};

  const queryCondition = { ...searchCondition, ...filterCondition };

  const blogs = await Blog.find(queryCondition)
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .populate('author', '-password');

  return blogs;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};

import { Blog } from '../Blog/blog.model';
import { User } from '../User/user.model';

const blockUserFromDB = async (userId: string, isBlocked: boolean) => {
  // Find the user and update only the `isBlocked` field
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: { isBlocked } },
    { new: true, runValidators: true },
  );

  // If the user is not found, throw an error
  if (!user) {
    throw new Error('User not found.');
  }

  return user; // Return the updated user
};

const deleteBlogFromDB = async (id: string) => {
  // find the blog and delete it
  const blog = await Blog.findByIdAndDelete(id);

  // if the blog is not found, throw an error
  if (!blog) {
    throw new Error('Blog not found.');
  }
  return blog;
};

export const AdminServices = {
  blockUserFromDB,
  deleteBlogFromDB,
};

import express from 'express';
import auth from '../../middlewares/auth';
import { BlogController } from './blog.controller';

const router = express.Router();

router.post('/blogs', auth('user'), BlogController.createBlog);
router.patch('/blogs/:id', auth('user'), BlogController.updateBlog);
router.delete('/blogs/:id', auth('user', 'admin'), BlogController.deleteBlog);

export const BlogRouter = router;

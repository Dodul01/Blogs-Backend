import express from 'express';
import auth from '../../middlewares/auth';
import { BlogController } from './blog.controller';

const router = express.Router();

router.post('/blogs', auth('user'), BlogController.createBlog);

export const BlogRouter = router;
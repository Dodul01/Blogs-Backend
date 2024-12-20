import express from 'express';
import auth from '../../middlewares/auth';
import { AdminController } from './admin.controller';

const router = express.Router();

router.patch('/users/:userId/block', auth('admin'), AdminController.blockUser);
router.delete('/blogs/:id', auth('admin'), AdminController.deleteBlog);

export const AdminRouter = router;

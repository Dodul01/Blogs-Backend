import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/auth/register', UserController.createUser);

export const UserRouter = router;
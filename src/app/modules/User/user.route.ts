import express from 'express';
import { UserController } from './user.controller';
// import auth from '../../middlewares/auth';
// import { USER_ROLE } from './user.constant';

const router = express.Router();

// Role based authirization done here
// example : auth(USER_ROLE.admin),
router.post('/auth/register', UserController.createUser);

export const UserRouter = router;

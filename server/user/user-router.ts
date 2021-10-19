import express from 'express';

import { userController } from './user-controller';

const userRouter = express.Router();

userRouter.get('/', userController.getUsers);

userRouter.get('/:id', userController.getUser);

export { userRouter };

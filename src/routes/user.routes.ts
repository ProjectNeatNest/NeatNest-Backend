import express from 'express';

import deleteUser from '../controllers/deleteUser.js';
import updateUser from '../controllers/updateUser.js';
import loginUser from '../controllers/loginUser.js';
import registerUser from '../controllers/registerUser.js';
import getAllUsers from '../controllers/getAllUsers.js';

export const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.patch('/:user_id', updateUser);
userRouter.delete('/:user_id', deleteUser);

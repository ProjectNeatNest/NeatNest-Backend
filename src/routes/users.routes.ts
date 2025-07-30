import express from 'express';

import deleteUser from '../controllers/users/deleteUser.js';
import updateUser from '../controllers/users/updateUser.js';
import loginUser from '../controllers/users/loginUser.js';
import registerUser from '../controllers/users/registerUser.js';
import { userAuth } from '../middlewares/userAuth.js';

export const usersRouter = express.Router();

usersRouter.post('/register', registerUser);
usersRouter.post('/login', loginUser);
usersRouter.patch('/:user_id', userAuth, updateUser);
usersRouter.delete('/:user_id', userAuth, deleteUser);

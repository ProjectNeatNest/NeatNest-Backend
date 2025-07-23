import express from 'express';

import deleteUser from '../controllers/users/deleteUser.js';
import updateUser from '../controllers/users/updateUser.js';
import loginUser from '../controllers/users/loginUser.js';
import registerUser from '../controllers/users/registerUser.js';
import getAllUsers from '../controllers/users/getAllUsers.js';

export const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);
usersRouter.post('/register', registerUser);
usersRouter.post('/login', loginUser);
usersRouter.patch('/:user_id', updateUser);
usersRouter.delete('/:user_id', deleteUser);

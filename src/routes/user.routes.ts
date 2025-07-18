import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { sendQuery } from '../config/db/dbConfig.js';
import { registerSchema, loginSchema } from '../schemas/userSchemas.js';
import HTTPError from '../models/HTTPError.js';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
   const users = await sendQuery('SELECT * FROM users');
   res.send({ message: 'Users list', data: users})
}); 

userRouter.post('/register', async (req, res) => 
{
   const validatedUser = registerSchema.parse(req.body);

   const [userByEmail] = await sendQuery('SELECT * FROM users WHERE email = $1',
      [validatedUser.email]
   );

   const [userByUsername] = await sendQuery('SELECT * FROM users WHERE username = $1',
      [validatedUser.username]
   );

   if (userByEmail) throw new HTTPError(400, 'Email already exists.');
   if (userByUsername) throw new HTTPError(400, 'Username already exists.');

   const encryptedPassword = bcrypt.hashSync(validatedUser.password, 10);

   const [newUser] = await sendQuery(
      'INSTERT INTO USERS (name, surname, surname_2, email, username, password) VALUES ($1, $2, $3, $4, $5, $6)', 
      [validatedUser.name, validatedUser.surname, validatedUser.surname_2, validatedUser.email, validatedUser.username, encryptedPassword]
   ); 

   res.status(201).send({ message: 'User registered', data: newUser });
});

userRouter.post('/login', async (req, res) => 
{
   const { email, password } = loginSchema.parse(req.body);

   const [userFound] = await sendQuery('SELECT * FROM users WHERE email = $1', [
      email
   ]);

   if (!userFound) throw new HTTPError(400, 'Incorrect User and/or password.');

   const passwordMatch = bcrypt.compareSync(password, userFound.password);

   if (!passwordMatch) throw new HTTPError(400, 'Incorrect User and/or password.');

   const tokenData = {
      user_id: userFound.user_id,
      username: userFound.username,
      email: userFound.email,
   }; 

   const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '30 days',
   });

   res.send({ message: 'User logged in', data: token });

});

export default userRouter;
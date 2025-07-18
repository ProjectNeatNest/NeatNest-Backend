import express from 'express';
import { sendQuery } from '../config/db/dbConfig.js';
import { registerSchema } from '../schemas/userSchemas.js';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
   const users = await sendQuery('SELECT * FROM users');
   res.send({ message: 'Lista de Users', data: users})
}); 

userRouter.post('/register', async (req, request) => 
{
   const validatedUser = registerSchema.parse(req.body);
});

userRouter.post('/login', async (req, request) => 
{

});


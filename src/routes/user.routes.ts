import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { sendQuery } from '../config/db/dbConfig.js';
import { registerSchema, loginSchema } from '../schemas/userSchemas.js';
import HTTPError from '../models/HTTPError.js';

export const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    const users = await sendQuery('SELECT * FROM users');
    res.send({ message: 'Users list', data: users });
});

userRouter.post('/register', async (req, res) => {
    const validatedUser = registerSchema.parse(req.body);

    const [userByEmail] = await sendQuery(
        'SELECT * FROM users WHERE email = $1',
        [validatedUser.email]
    );

    const [userByUsername] = await sendQuery(
        'SELECT * FROM users WHERE username = $1',
        [validatedUser.username]
    );

    if (userByEmail) throw new HTTPError(400, 'Email already exists.');
    if (userByUsername) throw new HTTPError(400, 'Username already exists.');

    const encryptedPassword = bcrypt.hashSync(validatedUser.password, 10);

    const [newUser] = await sendQuery(
        'INSERT INTO users (name, surname, surname_2, email, username, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [
            validatedUser.name,
            validatedUser.surname,
            validatedUser.surname_2,
            validatedUser.email,
            validatedUser.username,
            encryptedPassword,
        ]
    );

    res.status(201).send({ message: 'User registered', data: newUser });
});

userRouter.post('/login', async (req, res) => {
    const { email, password } = loginSchema.parse(req.body);

    const [userFound] = await sendQuery(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    if (!userFound) throw new HTTPError(400, 'Incorrect User and/or password.');

    const passwordMatch = bcrypt.compareSync(password, userFound.password);

    if (!passwordMatch)
        throw new HTTPError(400, 'Incorrect User and/or password.');

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

userRouter.patch('/:user_id', async (req, res) => {
    const { user_id } = req.params;

    const { name, surname, surname_2, email, username, password } = req.body;

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const [updatedUser] = await sendQuery(
        'UPDATE users SET name = $1, surname = $2, surname_2 = $3, email = $4, username = $5, password = $6 WHERE user_id = $7 RETURNING *',
        [name, surname, surname_2, email, username, encryptedPassword, user_id]
    );

    if (!updatedUser) throw new HTTPError(404, 'User not found.');

    res.status(200).send({ message: 'User updated', data: updatedUser });
});

userRouter.delete('/:user_id', async (req, res) => {
    const { user_id } = req.params;

    const [userFound] = await sendQuery(
        'SELECT * FROM users WHERE user_id = $1',
        [user_id]
    );

    if (!userFound) throw new HTTPError(404, 'User not found.');

    const [deletedUser] = await sendQuery(
        'DELETE FROM users WHERE user_id = $1 RETURNING *',
        [user_id]
    );

    res.status(200).send({ message: 'User deleted', data: deletedUser });
});

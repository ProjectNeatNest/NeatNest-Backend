import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { sendQuery } from '../../config/db/dbConfig.js';
import { registerSchema } from '../../schemas/userSchemas.js';
import HTTPError from '../../models/HTTPError.js';
import jwt from 'jsonwebtoken';

export default async function registerUser(req: Request, res: Response) {
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

    const tokenData = {
        user_id: newUser.user_id,
        username: newUser.username,
        email: newUser.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: '30 days',
    });

    res.status(201).send({
        message: 'User registered',
        data: { token: token, user: newUser },
    });
}

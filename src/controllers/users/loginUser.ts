import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { sendQuery } from '../../config/db/dbConfig.js';
import { loginSchema } from '../../schemas/userSchemas.js';
import HTTPError from '../../models/HTTPError.js';

export default async function loginUser(req: Request, res: Response) {
    const { email, password } = loginSchema.parse(req.body);

    const [userFound] = await sendQuery(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    if (!userFound) throw new HTTPError(400, 'Usuario o contraseña incorrectos.');

    const passwordMatch = bcrypt.compareSync(password, userFound.password);

    if (!passwordMatch)
        throw new HTTPError(400, 'Usuario o contraseña incorrectos.');

    const tokenData = {
        user_id: userFound.user_id,
        username: userFound.username,
        email: userFound.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: '30 days',
    });

    res.send({
        message: 'Has iniciado sesión.',
        data: { token: token, user: tokenData },
    });
}

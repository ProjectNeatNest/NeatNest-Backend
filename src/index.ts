import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { usersRouter } from '@/routes/users.routes.js';
import { housingsRouter } from '@/routes/housings.routes.js';

import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/users', usersRouter);
app.use('/housings', housingsRouter);

app.use(errorMiddleware);

app.use(/(.*)/, (req, res) => {
    res.status(404).send({ error: 'Route not established' });
});

const PORT = process.env.PORT || 2222;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

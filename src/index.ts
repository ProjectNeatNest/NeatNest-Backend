import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { usersRouter } from './routes/users.routes.js';
import { housingsRouter } from './routes/housings.routes.js';
import { areasRouter } from './routes/areas.routes.js';
import { defaultAreasRouter } from './routes/defaultAreas.routes.js';
import { tasksRouter } from './routes/tasks.routes.js';
import { taskDetailsRouter } from './routes/taskDetails.routes.js';
import { usersHousingsRouter } from './routes/usersHousings.routes.js';

import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/users', usersRouter);
app.use('/housings', housingsRouter);
app.use('/areas', areasRouter);
app.use('/defaultAreas', defaultAreasRouter);
app.use('/tasks', tasksRouter);
app.use('/taskDetails', taskDetailsRouter);
app.use('/usersHousings', usersHousingsRouter);

app.use(errorMiddleware);

app.use(/(.*)/, (req, res) => {
    res.status(404).send({ error: 'Route not established' });
});

const PORT = process.env.PORT || 2222;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

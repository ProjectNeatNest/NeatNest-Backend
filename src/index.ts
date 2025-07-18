import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { userRouter } from './routes/user.routes.js';
import { housingRouter } from './routes/housing.routes.js';

const app = express(); 

app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); 

app.use('/users', userRouter); 

app.use('/housings', housingRouter)

const PORT = process.env.PORT || 2222; 
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
})
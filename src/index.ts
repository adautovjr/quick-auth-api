import express from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';

import './database/connect';
import routes from './routes';

const app = express();

dotenv.config();
app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log('🚀  App running on http://localhost:3333'));
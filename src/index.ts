import express from 'express';
import 'reflect-metadata';

import './database/connect';
import router from './routes';

const app = express();
const port: number = 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`app running at localhost:${port}`));

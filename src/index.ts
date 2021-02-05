import express from 'express';
import 'reflect-metadata';

import './database/connect';
import routes from './routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`app running at localhost:${port}`));

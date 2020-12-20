import 'reflect-metadata';

import 'express-async-errors';

import express from 'express';
import uploadConfig from '@config/upload';
import routes from './routes';
import exceptionMiddleware from './middlewares/exceptionMiddleware';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(routes);
app.use(exceptionMiddleware);
app.use('/files', express.static(uploadConfig.directory));
app.listen(PORT, () => {
  console.log(`Back-end is running on port ${PORT}`);
});

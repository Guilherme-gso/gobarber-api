import express from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import exceptionMiddleware from './middlewares/exceptionMiddleware';
import './database';
import 'reflect-metadata';

const server = express();
const port = 3333;

server.use(express.json());
server.use(routes);
server.use(exceptionMiddleware);
server.use('/files', express.static(uploadConfig.directory));
server.listen(port, () => {
  console.log(`Back-end is running on port ${port}`);
});

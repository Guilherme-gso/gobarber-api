import uploadConfig from '@config/upload';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import multer from 'multer';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersController.store);
usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  ensureAuthenticated,
  usersController.update
);

export default usersRouter;

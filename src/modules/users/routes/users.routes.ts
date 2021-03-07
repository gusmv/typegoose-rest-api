import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';

const routes = Router();

const usersController = new UsersController();

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      birthDate: Joi.date().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(12).required(),
    }),
  }),
  usersController.create,
);

routes.put(
  '/:userId',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      userId: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      birthDate: Joi.date(),
      email: Joi.string().email(),
      password: Joi.string().min(6).max(12),
    }),
  }),
  usersController.update,
);

routes.get(
  '/:userId',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      userId: Joi.string().required(),
    }),
  }),
  usersController.show,
);

routes.get('/', usersController.index);

export default routes;

import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import Joi from '@utils/Joi';

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
    [Segments.PARAMS]: Joi.object().keys({
      userId: Joi.objectId().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      birthDate: Joi.date(),
      email: Joi.string().email(),
      password: Joi.object().keys({
        old: Joi.string().min(6).max(12),
        new: Joi.string().min(6).max(12).required().when('old', {
          is: Joi.exist(),
          then: Joi.optional(),
          otherwise: Joi.required(),
        }),
        confirmation: Joi.string().valid(Joi.ref('new')),
      }),
    }),
  }),
  usersController.update,
);

routes.get(
  '/:userId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      userId: Joi.objectId().required(),
    }),
  }),
  usersController.show,
);

routes.get('/', usersController.index);

routes.delete(
  '/:userId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      userId: Joi.objectId().required(),
    }),
  }),
  usersController.delete,
);

export default routes;

import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import Joi from '@utils/Joi';

import AuthenticationController from '../controllers/AuthenticationController';

const routes = Router();

const authenticationController = new AuthenticationController();

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(12).required(),
    }),
  }),
  authenticationController.create,
);

export default routes;

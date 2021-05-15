import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordController from '../controller/ForgotPasswordController';

const routes = Router();
const forgotPasswordController = new ForgotPasswordController();

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  forgotPasswordController.create,
);

routes.put(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      confirmation: Joi.string().valid(Joi.ref('password')),
    }),
  }),
  forgotPasswordController.update,
);

export default routes;

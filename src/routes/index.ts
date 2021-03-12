import { Router } from 'express';

import usersRoute from '@modules/users/routes/users.routes';
import authRoute from '@modules/users/routes/auth.routes';

const routes = Router();

routes.use('/users', usersRoute);
routes.use('/auth', authRoute);

export default routes;

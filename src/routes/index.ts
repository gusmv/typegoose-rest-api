import { Router } from 'express';

import usersRoute from '@modules/users/routes/users.routes';
import authRoute from '@modules/users/routes/auth.routes';
import passwordRoute from '@modules/passwords/routes/passwords.routes';

const routes = Router();

routes.use('/users', usersRoute);
routes.use('/auth', authRoute);
routes.use('/password', passwordRoute);

export default routes;

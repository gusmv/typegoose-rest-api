import { Router } from 'express';

import usersRoute from '@modules/users/routes/users.routes';

const routes = Router();

routes.use('/users', usersRoute);

export default routes;

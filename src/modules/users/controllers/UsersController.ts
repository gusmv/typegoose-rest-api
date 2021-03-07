import { Types } from 'mongoose';
import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import ShowUsersService from '@modules/users/services/ShowUsersService';

class UsersController {
  async create(req: Request, res: Response) {
    const { name, birthDate, email, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      birthDate,
      email,
      password,
    });

    return res.status(201).json(user);
  }

  async update(req: Request, res: Response) {
    const { userId } = req.params;

    Object.keys(req.body).forEach(
      key => req.body[key] === undefined && delete req.body[key],
    );

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({
      userId: Types.ObjectId(userId),
      ...req.body,
    });

    return res.json(user);
  }

  async show(req: Request, res: Response) {
    const { userId } = req.params;

    const showUserService = new ShowUserService();

    const user = await showUserService.execute(Types.ObjectId(userId));

    return res.json(user);
  }

  async index(req: Request, res: Response) {
    const showUsersService = new ShowUsersService();

    const users = await showUsersService.execute();

    return res.json(users);
  }
}

export default UsersController;

import { Types } from 'mongoose';
import { Request, Response } from 'express';
import { plainToClass, classToClass } from 'class-transformer';
import { User } from '@modules/users/schemas/User';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import ShowUsersService from '@modules/users/services/ShowUsersService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

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

    return res.status(201).json(plainToClass(User, user));
  }

  async update(req: Request, res: Response) {
    const { userId } = req.params;

    Object.keys(req.body).forEach(
      key => !req.body[key] && delete req.body[key],
    );

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({
      userId: Types.ObjectId(userId),
      ...req.body,
    });

    return res.json(classToClass(user));
  }

  async show(req: Request, res: Response) {
    const { userId } = req.params;

    const showUserService = new ShowUserService();

    const user = await showUserService.execute(Types.ObjectId(userId));

    return res.json(plainToClass(User, user));
  }

  async index(req: Request, res: Response) {
    const showUsersService = new ShowUsersService();

    const users = await showUsersService.execute();

    return res.json(plainToClass(User, users));
  }

  async delete(req: Request, res: Response) {
    const { userId } = req.params;

    const deleteUserService = new DeleteUserService();

    await deleteUserService.execute(Types.ObjectId(userId));

    return res.status(204).send();
  }
}

export default UsersController;

import { User } from '../schemas/User';
import UsersRepository from '../repositories/UsersRepository';

import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

import validate from '@utils/ObjectId';

class UpdateUserService {
  private repository = UsersRepository;

  async execute({ userId, ...userData }: IUpdateUserDTO): Promise<User> {
    if (!validate(userId)) {
      throw new Error('Invalid Object Id');
    }

    const userExists = await this.repository.findById(userId);

    if (!userExists) {
      throw new Error('User not found.');
    }

    const user = await this.repository.save({ userId, ...userData });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

export default UpdateUserService;

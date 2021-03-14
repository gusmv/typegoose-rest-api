import { User } from '../schemas/User';
import UsersRepository from '../repositories/UsersRepository';

import AppException from '@errors/AppException';

class ShowUsersService {
  private repository = UsersRepository;

  async execute(): Promise<User[]> {
    const users = await this.repository.list();

    if (!users) {
      throw new AppException('Users not found.');
    }

    return users;
  }
}

export default ShowUsersService;

import { Types } from 'mongoose';

import { User } from '../schemas/User';
import UsersRepository from '../repositories/UsersRepository';

class ShowUserService {
  private repository = UsersRepository;

  async execute(userId: Types.ObjectId): Promise<User> {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new Error('User not found.');
    }

    return user;
  }
}

export default ShowUserService;

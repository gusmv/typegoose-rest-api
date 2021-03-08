import { Types } from 'mongoose';

import UsersRepository from '../repositories/UsersRepository';

class DeleteUserService {
  private repository = UsersRepository;

  async execute(userId: Types.ObjectId): Promise<void> {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new Error('User not found.');
    }

    await this.repository.delete(userId);
  }
}

export default DeleteUserService;

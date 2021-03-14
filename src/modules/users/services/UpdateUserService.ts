import { compare, hash } from 'bcryptjs';

import AppException from '@errors/AppException';

import { User } from '../schemas/User';
import UsersRepository from '../repositories/UsersRepository';

import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

class UpdateUserService {
  private repository = UsersRepository;

  async execute({ userId, ...userData }: IUpdateUserDTO): Promise<User> {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new AppException('User not found.');
    }

    const { password, email } = userData;

    if (email) {
      const user = await this.repository.findByEmail(email);

      if (user && user.id.toString() !== userId.toString()) {
        throw new AppException('Email already in use.');
      }
    }

    if (password && password.new && password.old) {
      const checkOldPassword = await compare(password.old, user.password);

      if (!checkOldPassword) {
        throw new AppException('Old password does not match');
      }

      user.password = await hash(password.new, 8);

      delete userData.password;
    }

    Object.assign(user, userData);

    await this.repository.save(userId, user);

    return user;
  }
}

export default UpdateUserService;

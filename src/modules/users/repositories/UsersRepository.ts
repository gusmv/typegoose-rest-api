import { Types } from 'mongoose';

import UserModel, { User } from '../schemas/User';

import IUsersRepository from '../dtos/IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

class UsersRepository implements IUsersRepository {
  async findById(userId: Types.ObjectId): Promise<User | null> {
    const user = await UserModel.findById(userId);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });

    return user;
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = await UserModel.create(data);

    return user;
  }

  async save(userData: IUpdateUserDTO): Promise<User | null> {
    const user = await UserModel.findByIdAndUpdate(userData.userId, userData);

    return user;
  }

  async list(): Promise<User[]> {
    const users = await UserModel.find();

    return users;
  }
}

export default new UsersRepository();

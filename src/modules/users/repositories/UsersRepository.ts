import { Types } from 'mongoose';

import UserModel, { User } from '../schemas/User';

import IUsersRepository from '../dtos/IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

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

  async save(userId: Types.ObjectId, userData: User): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, userData);
  }

  async list(): Promise<User[]> {
    const users = await UserModel.find();

    return users;
  }

  async delete(userId: Types.ObjectId): Promise<void> {
    await UserModel.findByIdAndDelete(userId);
  }
}

export default new UsersRepository();

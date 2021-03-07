import UserModel, { User } from "../schemas/User";

import IUsersRepository from "../dtos/IUsersRepository";
import ICreateUserDTO from "../dtos/ICreateUserDTO";

class UsersRepository implements IUsersRepository {
  async findById(userId: string): Promise<User | null> {
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

  async save(userId: string, userData: User): Promise<User | null> {
    const user = await UserModel.findByIdAndUpdate(userId, userData);

    return user;
  }
}

export default UsersRepository;

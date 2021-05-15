import { Types } from 'mongoose';
import { v4 as uuid } from 'uuid';

import TokenModel, { Token } from '../schemas/Token';
import { User } from '@modules/users/schemas/User';

import ITokensRepository from '../dtos/ITokensRepository';

class UsersRepository implements ITokensRepository {
  async findByToken(token: string): Promise<Token | null> {
    const userToken = await TokenModel.findOne({ token });

    return userToken;
  }

  async create(user: User): Promise<Token> {
    const userToken = await TokenModel.create({
      token: uuid(),
      user,
    });

    return userToken;
  }

  async deleteByUserId(userId: Types.ObjectId): Promise<void> {
    await TokenModel.findOneAndDelete({ user: userId });
  }
}

export default new UsersRepository();

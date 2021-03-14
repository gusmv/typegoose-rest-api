import { Types } from 'mongoose';

import { Token } from '../schemas/Token';
import { User } from '@modules/users/schemas/User';

export default interface IUsersRepository {
  findByToken(token: string): Promise<Token | null>;
  create(user: User): Promise<Token>;
  deleteByUserId(userId: Types.ObjectId): Promise<void>;
}

import { Types } from 'mongoose';

import { User } from '../schemas/User';

import ICreateUserDTO from './ICreateUserDTO';

export default interface IUsersRepository {
  findById(userId: Types.ObjectId): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: ICreateUserDTO): Promise<User>;
  save(userId: Types.ObjectId, userData: User): Promise<void>;
  list(): Promise<User[]>;
  delete(userId: Types.ObjectId): Promise<void>;
}

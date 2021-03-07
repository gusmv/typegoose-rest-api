import { Types } from 'mongoose';

import { User } from '../schemas/User';

import ICreateUserDTO from './ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

export default interface IUsersRepository {
  findById(userId: Types.ObjectId): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: ICreateUserDTO): Promise<User>;
  save(userData: IUpdateUserDTO): Promise<User | null>;
  list(): Promise<User[]>;
}

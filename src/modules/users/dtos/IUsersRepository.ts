import { User } from "../schemas/User";
import ICreateUserDTO from "./ICreateUserDTO";

export default interface IUsersRepository {
  findById(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: ICreateUserDTO): Promise<User>;
  save(userId: string, user: User): Promise<User | null>;
}

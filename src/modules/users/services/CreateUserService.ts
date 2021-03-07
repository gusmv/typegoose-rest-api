import { hash } from 'bcryptjs';

import { User } from '../schemas/User';
import UsersRepository from '../repositories/UsersRepository';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

class CreateUserService {
  private repository = UsersRepository;

  async execute({
    name,
    email,
    birthDate,
    password,
  }: ICreateUserDTO): Promise<User> {
    const userExists = await this.repository.findByEmail(email);

    if (userExists) {
      throw new Error('User already exist.');
    }

    const passwordHashed = await hash(password, 8);

    const user = await this.repository.create({
      name,
      birthDate,
      email,
      password: passwordHashed,
    });

    return user;
  }
}

export default CreateUserService;

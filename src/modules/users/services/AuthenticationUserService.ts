import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { plainToClass } from 'class-transformer';

import { User } from '../schemas/User';
import UsersRepository from '../repositories/UsersRepository';

import config from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: User;
}

class AuthenticationUserService {
  private repository = UsersRepository;

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new Error('User not found.');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email/password does not match');
    }

    const token = await sign(
      {
        userId: user.id,
      },
      config.secretKey,
      {
        expiresIn: config.expiresIn,
      },
    );

    return {
      token,
      user: plainToClass(User, user),
    };
  }
}

export default AuthenticationUserService;

import { hash } from 'bcryptjs';
import TokenRepository from '../repositories/TokenRepository';
import UsersRepository from '@modules/users/repositories/UsersRepository';

interface IRequest {
  requestToken: string;
  password: string;
}

class ResetUserPasswordService {
  private tokenRepository = TokenRepository;

  private usersRepository = UsersRepository;

  async execute({ requestToken, password }: IRequest): Promise<void> {
    const token = await this.tokenRepository.findByToken(requestToken);

    if (!token) {
      throw new Error('Token does not exist.');
    }

    const user = await this.usersRepository.findById(token.user);

    if (!user) {
      throw new Error('User does not exist.');
    }

    user.password = await hash(password, 8);

    await this.usersRepository.save(user.id, user);
    await this.tokenRepository.deleteByUserId(user.id);
  }
}

export default ResetUserPasswordService;

import TokenRepository from '../repositories/TokenRepository';
import UsersRepository from '@modules/users/repositories/UsersRepository';

import config from '@config/app';

import Queues from '@jobs/index';

class ForgotPasswordService {
  private usersRepository = UsersRepository;

  private tokenRepository = TokenRepository;

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found.');
    }

    await this.tokenRepository.deleteByUserId(user.id);
    const token = await this.tokenRepository.create(user);

    await Queues.email.add('passwordrecovery.hbs', {
      email,
      token: token.token,
      user: user.name,
      URL: config.url,
      subject: 'Password recovery',
    });
  }
}

export default ForgotPasswordService;

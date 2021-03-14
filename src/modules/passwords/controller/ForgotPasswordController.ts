import { Request, Response } from 'express';

import ForgotPasswordService from '../services/ForgotPasswordService';
import ResetUserPasswordService from '../services/ResetUserPasswordService';

class ForgotPasswordController {
  async update(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const resetUserPasswordService = new ResetUserPasswordService();

    await resetUserPasswordService.execute({
      requestToken: token,
      password,
    });

    return res.status(200).json({
      message: 'Password updated.',
    });
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const createTokenService = new ForgotPasswordService();

    await createTokenService.execute(email);

    return res.status(201).send();
  }
}

export default ForgotPasswordController;

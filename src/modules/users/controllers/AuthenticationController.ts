import { Request, Response } from 'express';

import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';

class AuthenticationController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticationUserService = new AuthenticationUserService();

    const user = await authenticationUserService.execute({
      email,
      password,
    });

    return res.status(201).json(user);
  }
}

export default AuthenticationController;

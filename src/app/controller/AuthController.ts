import { Response, Request } from 'express';
import { getRepository, Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import { MESSAGES } from '../../utils/constants';
import { validateEmail } from '../../utils/utils';
import { keys } from '../../variables';

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository: Repository<User> = getRepository(User);

    const { email, password } = req.body;

    const isMailValid: boolean = validateEmail(email);

    if (isMailValid) {
      const user: User | undefined = await repository.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(401).send(MESSAGES.LOGIN_FAILED);
      }

      const isPasswordValid: boolean = await bcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(401).send(MESSAGES.LOGIN_FAILED);
      }

      const token = jwt.sign({ id: user.id }, keys.TOKEN_KEY, {
        expiresIn: '1d',
      });

      delete user.password;

      return res.status(200).send(MESSAGES.LOGIN_SUCCESS);
    } else {
      return res.status(400).send(MESSAGES.VERIFIED_EMAIL_FAIL);
    }
  }
}

export default new AuthController();

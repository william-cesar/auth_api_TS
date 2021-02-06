import { Response, Request } from 'express';
import { getRepository, Repository } from 'typeorm';
import { MESSAGES } from '../../utils/constants';
import User from '../models/User';

import { validateEmail } from './../../utils/utils';

class UserController {
  async store(req: Request, res: Response) {
    const repository: Repository<User> = getRepository(User);

    const { email, password } = req.body;

    const isMailValid: boolean = validateEmail(email);

    if (isMailValid) {
      const userExists: User | undefined = await repository.findOne({
        where: { email },
      });
      if (userExists) {
        return res.send(MESSAGES.CREATE_USER_FAIL);
      }
    } else {
      return res.send(MESSAGES.VERIFIED_EMAIL_FAIL);
    }

    const user: User = repository.create({ email, password });
    await repository.save(user);

    return res.send(MESSAGES.CREATE_USER_SUCCESS);
  }
}

export default new UserController();

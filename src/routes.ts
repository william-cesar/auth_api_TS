import { Router } from 'express';
import UserController from './app/controller/UserController';

const router: Router = Router();

router.post('/users', UserController.store);

export default router;

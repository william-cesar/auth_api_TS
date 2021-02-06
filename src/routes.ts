import { Router } from 'express';
import AuthController from './app/controller/AuthController';
import UserController from './app/controller/UserController';

const router: Router = Router();

router.post('/users', UserController.store);
router.post('/auth', AuthController.authenticate);

export default router;

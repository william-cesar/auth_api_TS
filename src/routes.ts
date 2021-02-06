import { Router } from 'express';
import AuthController from './app/controller/AuthController';
import UserController from './app/controller/UserController';
import authMiddleware from './app/middleware/authMiddleware';

const router: Router = Router();

router.post('/users', UserController.store);
router.post('/auth', AuthController.authenticate);
router.get('/users', authMiddleware, UserController.index);

export default router;

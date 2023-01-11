import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';
import { uploader } from '../utils.js';

const router = Router();

router.post('/register', uploader.single('file'), sessionsController.register)
router.post('/login', sessionsController.login)
router.post('/logout', sessionsController.logout)

export default router;
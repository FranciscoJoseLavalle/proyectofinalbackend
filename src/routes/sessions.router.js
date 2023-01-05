import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';
import { userService, cartService } from '../services/services.js';

const router = Router();

router.post('/register', sessionsController.register)
router.post('/login', sessionsController.login)
router.get('/data', async (req, res) => {
    let users = await userService.getAll();
    res.send(users)
});

export default router;
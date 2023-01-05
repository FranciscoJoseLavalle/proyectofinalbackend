import { Router } from 'express';
import { productService } from '../services/services.js';

const router = Router();

router.get('/', async (req, res) => {
    let products = await productService.getAll();
    res.render('home', {
        products
    })
})
router.get('/register', (req, res) => {
    res.render('register')
})
router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/data', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('data', { user: req.session.user })
})
export default router;
import { Router } from 'express';
import { productService } from '../services/services.js';
import axios from 'axios';

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
router.get('/products', (req, res) => {
    res.render('addProducts')
})
router.get('/cart', (req, res) => {
    let products;
    axios.get(`http://localhost:8080/api/carts/${req.session.user.cart}/products`)
        .then((response) => {
            console.log(response.data);
            products = response.data
            console.log(products);
        })

    // console.log(products);
    res.render('cart', {
        products
    })
})
export default router;
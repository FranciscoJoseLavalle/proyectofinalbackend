import { Router } from 'express';
import { productService } from '../services/services.js';
import axios from 'axios';

const router = Router();

router.get('/', async (req, res) => {
    let products = await productService.getAll();
    res.render('home', {
        products,
        session: req.session
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

router.get('/products', async (req, res) => {
    try {
        let products = await productService.getAll();
        res.render('products', {
            products
        })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
})
router.get('/addProducts', (req, res) => {
    res.render('addProducts')
})

router.get('/cart', (req, res) => {
    try {
        let products;
        axios.get(`http://localhost:8080/api/carts/${req.session.user.cart}/products`)
            .then((response) => {
                products = response.data
                res.render('cart', {
                    products
                })
            })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
})
export default router;
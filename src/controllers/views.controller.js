import { productService } from '../services/services.js';
import config from '../config/config.js';
import axios from 'axios';

const home = async (req, res) => {
    try {
        let products = await productService.getAll();
        res.render('home', {
            products,
            session: req.session
        })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const register = (req, res) => {
    try {
        res.render('register')
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const login = (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const products = async (req, res) => {
    try {
        let products = await productService.getAll();
        res.render('products', {
            products
        })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const addProducts = (req, res) => {
    try {
        res.render('addProducts')
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const cart = (req, res) => {
    try {
        let products;
        axios.get(`${config.app.URL}/api/carts/${req.session.user.cart}/products`)
            .then((response) => {
                products = response.data
                res.render('cart', {
                    products
                })
            })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

export default {
    home,
    register,
    login,
    products,
    addProducts,
    cart
}
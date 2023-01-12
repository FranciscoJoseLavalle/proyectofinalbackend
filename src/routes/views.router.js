import { Router } from 'express';
import productsController from '../controllers/products.controller.js'
import viewsController from '../controllers/views.controller.js';

const router = Router();

router.get('/', viewsController.home);

router.get('/register', viewsController.register);

router.get('/login', viewsController.login);

router.get('/products', productsController.adminMiddleware, viewsController.products);

router.get('/addProducts', productsController.adminMiddleware, viewsController.addProducts);

router.get('/cart', viewsController.cart)

export default router;
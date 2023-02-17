import { Router } from 'express';
import cartsController from '../controllers/carts.controller.js';

const router = Router();

router.get('/', cartsController.findAllCarts);

router.get('/:cid/products', cartsController.findCartsBy);

router.get('/:cid/products/quantity', cartsController.getTotalProductsQuantity);

router.post('/:cid/products', cartsController.addProductToCart);

router.put('/:cid/endbuy', cartsController.endBuy);

router.delete('/:cid/products', cartsController.deleteProductFromCart);

export default router;
import { Router } from 'express';
import { uploader } from '../utils.js';
import productsController from '../controllers/products.controller.js'

const router = Router();

let adminMiddleware = productsController.adminMiddleware;

router.get('/', productsController.findAllproducts)

router.get('/:pid', productsController.findProductsBy)

router.post('/', adminMiddleware, uploader.single('file'), productsController.addProduct)

router.put('/:pid/', adminMiddleware, productsController.editProduct)

router.delete('/:pid/', adminMiddleware, productsController.deleteProduct)

export default router;
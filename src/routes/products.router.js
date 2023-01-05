import { Router } from 'express';
import { productService } from '../services/services.js';

const router = Router();

const adminMiddleware = async (req, res, next) => {
    let admin = true;
    if (admin == true) {
        next();
    }
}

router.get('/', async (req, res) => {
    let products = await productService.getAll();
    console.log(products);
    res.send(products)
})

router.get('/:pid', async (req, res) => {
    let pid = req.params.pid;
    let product = await productService.getById(pid);
    console.log(product);
    res.send(product);
})

router.post('/', adminMiddleware, async (req, res) => {
    let product = await req.body;
    let result = await productService.save(product)
    console.log(result);
    res.send({ status: "success, new product added" })
})

router.put('/:pid/', adminMiddleware, async (req, res) => {
    let pid = req.params.pid;
    let productData = await req.body;
    let product = await productService.editById(pid, productData);
    console.log(product);
    res.send({ status: "completed" })
})

router.delete('/:pid/', adminMiddleware, async (req, res) => {
    let pid = req.params.pid;
    await productService.deleteById(pid);
    res.send({ status: "completed" })
})

export default router;
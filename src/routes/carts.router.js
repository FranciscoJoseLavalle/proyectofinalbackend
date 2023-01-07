import { Router } from 'express';
import { cartService, productService } from '../services/services.js';

const router = Router();

router.get('/', async (req, res) => {
    let cart = await cartService.getAll();
    res.send(cart)
})

router.get('/:cid/products', async (req, res) => {
    let cid = req.params.cid;
    let products = await cartService.findAllProducts({ _id: cid })
    res.send(products);
})

router.post('/:cid/products', async (req, res) => {
    let cid = req.params.cid;
    let { pid } = req.body;

    let cart = await cartService.addProduct({ _id: cid }, pid);
    res.send(cart)
})

router.delete('/:cid', async (req, res) => {
    let cid = req.params.cid;
    await cartService.deleteOne(cid)
    res.send({ message: "cart deleted succesfully" })
})
router.delete('/:cid/products/:pid', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    // await cartService.editById(cid, pid, 'deleteProduct')
    let cart = await cartService.getById(cid);
    await cartService.deleteProduct(cart, pid)
    console.log(cart.products);
    res.send({ message: "product deleted succesfully" })
})

export default router;
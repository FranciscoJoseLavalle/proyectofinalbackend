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

router.put('/:cid/endbuy', async (req, res) => {
    try {
        let cid = req.params.cid;
        let email = req.session.user.email
        let products = await cartService.endBuy({ _id: cid }, email)
        if (products.status) {
            await cartService.emptyCart({ _id: cid })
        }
        res.send(products)
    } catch (error) {
        return res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
});

router.delete('/:cid/products', async (req, res) => {
    let cid = req.params.cid;
    let { pid } = req.body;
    let cart = await cartService.deleteProduct({ _id: cid }, pid)
    res.send(cart)
})

export default router;
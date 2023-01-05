import { Router } from 'express';
import { cartService, productService } from '../services/services.js';

const router = Router();

router.get('/', async (req, res) => {
    let cart = await cartService.getAll();
    res.send(cart)
})

router.get('/:cid/products', async (req, res) => {
    let cid = req.params.cid;
    let cart = await cartService.getBy({ _id: cid });
    console.log(cart);
    let products = [];

    if (cart.products !== undefined) {
        for (let i = 0; i < cart.products.length; i++) {
            products.push(await productService.getBy({ pid: cart.products[i].pid }))
        }
    }
    if (cart.products == undefined) {
        for (let i = 0; i < cart[0].products.length; i++) {
            products.push(await productService.getBy({ pid: cart[0].products[i].pid }))
        }
    }

    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ status: "error", message: "There isn't products" })
    }

})

router.post('/', async (req, res) => {
    let cart = {
        products: []
    }
    let cartID = await cartService.save(cart);
    console.log(cartID);
    res.send({ message: "Added succesfully" });
})


router.post('/:cid/products', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.body;
    // await cartService.editById(cid, pid);
    let cart = await cartService.getBy(cid);
    await cartService.addProduct(cart, pid)
    // console.log(cart);
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
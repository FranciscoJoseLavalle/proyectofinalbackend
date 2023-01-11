import { Router } from 'express';
import { productService } from '../services/services.js';

const router = Router();

const adminMiddleware = async (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.role === 'admin') {
            next();
        } else {
            res.send({ status: "error", message: "No tienes los permisos para realizar esta accion" })
        }
    } else {
        res.send({ status: "error", message: "Necesitas estar logueado para agregar un producto" })
    }
}

router.get('/', async (req, res) => {
    let products = await productService.getAll();
    res.send(products)
})

router.get('/:pid', async (req, res) => {
    let pid = req.params.pid;
    let product = await productService.getBy({ _id: pid });
    res.send(product);
})

router.post('/', adminMiddleware, async (req, res) => {
    let product = await req.body;
    let result = await productService.save(product)
    res.send({ status: "success", message: "New product added" })
})

router.put('/:pid/', adminMiddleware, async (req, res) => {
    let pid = req.params.pid;
    let { name, price, stock, description, thumbnail } = req.body;
    let product = await productService.editOne({ _id: pid }, { name, price, stock, description, thumbnail });
    res.send({ status: "success", message: "Product edited succesfully" })
})

router.delete('/:pid/', adminMiddleware, async (req, res) => {
    let pid = req.params.pid;
    await productService.deleteOne({ _id: pid });
    res.send({ status: "success", message: "Product deleted succesfully" })
})

export default router;
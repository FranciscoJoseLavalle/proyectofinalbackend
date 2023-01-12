import { productService } from '../services/services.js';

const adminMiddleware = async (req, res, next) => {
    try {
        if (req.session.user) {
            if (req.session.user.role === 'admin') {
                next();
            } else {
                res.send({ status: "error", message: "No tienes los permisos para realizar esta accion" })
            }
        } else {
            res.send({ status: "error", message: "Necesitas estar logueado para agregar un producto" })
        }
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const findAllproducts = async (req, res) => {
    try {
        let products = await productService.getAll();
        res.send(products)
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const findProductsBy = async (req, res) => {
    try {
        let pid = req.params.pid;
        let product = await productService.getBy({ _id: pid });
        res.send(product);
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const addProduct = async (req, res) => {
    try {
        let product = await req.body;
        product.thumbnail = `/img/${req.file.filename}`
        let result = await productService.save(product)
        res.send({ status: "success", message: "New product added" })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const editProduct = async (req, res) => {
    try {
        let pid = req.params.pid;
        let { name, price, stock, description, thumbnail } = req.body;
        let product = await productService.editOne({ _id: pid }, { name, price, stock, description, thumbnail });
        res.send({ status: "success", message: "Product edited succesfully" })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const deleteProduct = async (req, res) => {
    try {
        let pid = req.params.pid;
        await productService.deleteOne({ _id: pid });
        res.send({ status: "success", message: "Product deleted succesfully" })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

export default {
    adminMiddleware,
    findAllproducts,
    findProductsBy,
    addProduct,
    editProduct,
    deleteProduct
}
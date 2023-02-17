import { cartService } from '../services/services.js';

const findAllCarts = async (req, res) => {
    try {
        let cart = await cartService.getAll();
        res.send(cart)
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const findCartsBy = async (req, res) => {
    try {
        let cid = req.params.cid;
        let products = await cartService.findAllProducts({ _id: cid })
        res.send(products);
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const getTotalProductsQuantity = async (req, res) => {
    try {
        let cid = req.params.cid;
        let result = await cartService.allProductsQuantity({ _id: cid })
        res.send({ result });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const addProductToCart = async (req, res) => {
    try {
        let cid = req.params.cid;
        let { pid } = req.body;
        let cart = await cartService.addProduct({ _id: cid }, pid);
        res.send(cart)
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const endBuy = async (req, res) => {
    try {
        let cid = req.params.cid;
        let email = req.session.user.email
        let products = await cartService.endBuy({ _id: cid }, email)
        if (products.status) {
            await cartService.emptyCart({ _id: cid })
        }
        res.send(products)
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const deleteProductFromCart = async (req, res) => {
    try {
        let cid = req.params.cid;
        let { pid } = req.body;
        let cart = await cartService.deleteProduct({ _id: cid }, pid)
        res.send(cart)
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

export default {
    findAllCarts,
    findCartsBy,
    getTotalProductsQuantity,
    addProductToCart,
    endBuy,
    deleteProductFromCart
}
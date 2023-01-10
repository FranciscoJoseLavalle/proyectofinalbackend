import GenericRepository from "./GenericRepository.js";
import Cart from "../models/Cart.js";
import { productService } from "./services.js";

export default class CartRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Cart.model);
    }

    findAllProducts = async (params) => {
        try {
            let cart = await this.getBy(params, this.model)
            let products = []

            for (let i = 0; i < cart.products.length; i++) {
                let product = await productService.getBy({ _id: cart.products[i].pid })
                if (product) {
                    product.quantity = cart.products[i].quantity;
                    products.push(product)
                }
            }

            return products
        } catch (error) {
            return { status: "error", error: "Internal error", trace: error }
        }
    }

    addProduct = async (params, pid) => {
        try {
            let cart = await this.getBy(params, this.model)
            let productID = cart.products.find(product => product.pid === pid)
            let product = await productService.getBy({ _id: pid })
            console.log(product);
            if (productID) {
                if (product.stock > 0 && productID.quantity < product.stock) {
                    productID.quantity++
                }
            } else if (product.stock > 0) {
                let newProduct = { pid, quantity: 1 }
                cart.products.push(newProduct)
            }
            let cartUpdated = await this.editOne(params, { products: cart.products })
            return cartUpdated;
        } catch (error) {
            return { status: "error", error: "Internal error", trace: error }
        }

    }

    endBuy = async (params) => {
        try {
            let products = await this.findAllProducts(params);
            await productService.restStock(products)
            return { status: 'success', message: "Compra realizada satisfactoriamete" }
        } catch (error) {
            return { status: "error", error: "Internal error", trace: error }
        }

    }

    emptyCart = async (params) => {
        try {
            await this.editOne(params, { products: [] })
            return { status: "success", message: "Carrito vaciado satisfactoriamente" }
        } catch (error) {
            return { status: "error", error: "Internal error", trace: error }
        }

    }

    deleteProduct = async (params, pid) => {
        try {
            let cart = await this.getBy(params, this.model)
            let productID = cart.products.find(product => product.pid === pid)
            if (productID) {
                if (productID.quantity > 1) {
                    productID.quantity--
                } else {
                    cart.products = cart.products.filter(product => product.pid != pid);
                }
            }
            let cartUpdated = await this.editOne(params, { products: cart.products })
            return cartUpdated
        } catch (error) {
            return { status: "error", error: "Internal error", trace: error }
        }

    }
}
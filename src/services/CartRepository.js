import GenericRepository from "./GenericRepository.js";
import Cart from "../models/Cart.js";
import { productService } from "./services.js";

export default class CartRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Cart.model);
    }

    findAllProducts = async (params) => {
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
    }

    addProduct = async (params, pid) => {
        let cart = await this.getBy(params, this.model)
        let productID = cart.products.find(product => product.pid === pid)
        if (productID) {
            productID.quantity++
        } else {
            let newProduct = { pid, quantity: 1 }
            cart.products.push(newProduct)
        }
        let cartUpdated = await this.editOne(params, { products: cart.products })
        return cartUpdated;
    }

    deleteProduct = async (params, pid) => {
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
    }
}
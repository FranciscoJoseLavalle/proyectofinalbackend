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
            products.push(await productService.getBy({ _id: cart.products[i] }))
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
        // console.log(cartUpdated)
        // console.log(cart);
        // console.log(cartUpdated);
        // console.log(pid);

        return cartUpdated;


        // let cart = this.model.find({ _id: object[0]._id }, { products: 1 });
        // let productsInCart = cart[0].products;
        // let product = cart[0].products.find(item => item.pid == pid.pid);
        // let conditionalArray = []
        // conditionalArray.push(product);

        // if (conditionalArray[0] == null) {
        //     cart[0].products.push({ pid: pid.pid, quantity: 1 })
        // } else {
        //     product.quantity++;
        // }
        // this.model.updateOne({ _id: object[0]._id }, { $set: { products: productsInCart } })
        // // cart.save();
        // return cart
    }

    deleteProduct = (object, pid) => {
        let cart = this.model.find({ _id: object[0]._id }, { products: 1 });
        let productsInCart = cart[0].products;
        cart[0].products = cart[0].products.filter(item => item.pid != pid);

        this.model.updateOne({ _id: object[0]._id }, { $set: { products: cart[0].products } })
        // cart.save();
        return cart
    }
}
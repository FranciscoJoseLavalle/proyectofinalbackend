import GenericRepository from "./GenericRepository.js";
import Product from "../models/Product.js";

export default class ProductRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Product.model);
    }
    restStock = async (products) => {
        for (let i = 0; i < products.length; i++) {
            await this.editOne({ _id: products[i]._id }, { stock: products[i].stock - products[i].quantity })
        }
        return 'success'
    }
}
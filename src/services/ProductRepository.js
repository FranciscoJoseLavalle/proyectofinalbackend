import GenericRepository from "./GenericRepository.js";
import Product from "../models/Product.js";

export default class ProductRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Product.model);
    }
}
import GenericRepository from "./GenericRepository.js";
import Cart from "../models/Cart.js";

export default class CartRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Cart.model);
    }
}
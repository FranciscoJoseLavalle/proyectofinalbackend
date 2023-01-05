import mongoose from 'mongoose';

export default class Product {
    static get model() {
        return 'Products'
    }
    static get schema() {
        return {
            name: String,
            description: String,
            code: String,
            thumbnail: String,
            price: Number,
            stock: Number
        }
    }
}
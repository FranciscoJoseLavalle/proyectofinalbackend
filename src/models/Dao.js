import mongoose from 'mongoose';

import User from './User.js';
import Cart from './Cart.js';
import Product from './Product.js';

import config from '../config/config.js';

export default class Dao {
    constructor() {
        mongoose.set("strictQuery", false);
        this.connection = mongoose.connect("mongodb+srv://coder:123@cluster0.lwstatk.mongodb.net/?retryWrites=true&w=majority")

        const userSchema = mongoose.Schema(User.schema)
        const cartSchema = mongoose.Schema(Cart.schema)
        const productSchema = mongoose.Schema(Product.schema)

        this.models = {
            [User.model]: mongoose.model(User.model, userSchema),
            [Cart.model]: mongoose.model(Cart.model, cartSchema),
            [Product.model]: mongoose.model(Product.model, productSchema),
        }
    }

    getAll = (params, entity) => {
        if (!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].find(params).lean();
    }

    findOne = (params, entity) => {
        if (!this.models[entity]) throw new Error('La entidad no existe')
        return this.models[entity].findOne(params).lean();
    }

    save = (document, entity) => {
        if (!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].create(document);
    }

    editOne = (params, entity, document) => {
        if (!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].findOneAndUpdate(params, document, {
            new: true
        });
    }

    deleteOne = (params, entity) => {
        if (!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].deleteOne(params);
    }
}
import mongoose from 'mongoose';

export default class Cart {
    static get model() {
        return 'Carts'
    }
    static get schema() {
        return {
            products: [
                {
                    product: {
                        // type: mongoose.SchemaType.ObjectId, // Me tiraba error
                        pid: String,
                        quantity: Number
                    }
                }
            ]
        }
    }
}
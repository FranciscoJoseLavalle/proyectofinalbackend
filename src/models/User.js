import mongoose from 'mongoose';

export default class User {
    static get model() {
        return 'Users';
    }
    static get schema() {
        return {
            first_name: String,
            last_name: String,
            password: String,
            email: String,
            role: {
                type: String,
                enum: ['user', 'admin'],
                default: 'user',
            },
            avatar: String,
            address: String,
            cart: {
                // type: mongoose.SchemaType.ObjectId, // Me tiraba error
                type: String,
                ref: 'Carts'
            }
        }
    }
}
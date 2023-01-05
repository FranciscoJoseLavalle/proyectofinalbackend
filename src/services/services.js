import Dao from '../models/Dao.js';
import UserRepository from './UserRepository.js';
import ProductRepository from './ProductRepository.js';
import CartRepository from './CartRepository.js';

const dao = new Dao();

export const userService = new UserRepository(dao);
export const productService = new ProductRepository(dao);
export const cartService = new CartRepository(dao);

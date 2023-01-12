import { userService, cartService } from "../services/services.js";
import { createHash, isValidPassword } from "../utils.js";

const register = async (req, res) => {
    let { first_name, last_name, password, email, address } = req.body;
    try {
        if (!req.file) return res.status(500).send({ status: "error", error: "No se pudo cargar el avatar" })
        let user = await userService.getUserByEmail(email);
        if (user) return res.status(400).send({ status: 'error', error: "El usuario ya existe" });
        let cart = await cartService.save({ products: [] })
        const hashedPassword = await createHash(password);
        const newUser = {
            first_name,
            last_name,
            email,
            address,
            password: hashedPassword,
            cart: cart._id,
            // avatar: "Aa"
            avatar: `/img/${req.file.filename}`
        }
        let result = await userService.save(newUser);
        res.send({ status: "success", message: "User registered" });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const login = async (req, res) => {
    let { password, email } = req.body;
    try {
        if (!email || !password) return res.status(400).send({ status: 'error', error: "Incomplete values" });

        let user = await userService.getUserByEmail(email);
        if (!user) return res.status(400).send({ status: "error", error: "Incorrect credentials" })

        if (!isValidPassword(user, password)) return res.status(400).send({ status: "error", error: "Incorrect password" })
        req.session.user = {
            email,
            name: user.first_name,
            role: user.role,
            cart: user.cart,
            id: user._id,
            avatar: user.avatar
        }
        res.send({ status: "success", message: "Logged in succesfully", payload: req.session.user });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const logout = async (req, res) => {
    try {
        req.session.user = null
        res.send({ status: "success", message: "Logout succesfull" })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

export default {
    register,
    login,
    logout
}
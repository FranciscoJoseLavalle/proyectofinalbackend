import express from 'express';
import config from './config/config.js';
import sessionsRouter from './routes/sessions.router.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars';
import __dirname from './utils.js'
import MongoStore from "connect-mongo";
import session from "express-session";
import { cartService } from './services/services.js';

const app = express();
const PORT = config.app.PORT || 8080;

app.use(express.json());
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: config.app.SECRET,
    store: MongoStore.create({
        mongoUrl: config.mongo.URL,
        ttl: 3600
    }),
    resave: false,
    saveUninitialized: false
}))
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
})

// HANDLEBARS
app.engine("handlebars", handlebars.engine({
    helpers: {
        isAdmin: (value) => {
            if (value === 'admin') return true
            return false
        },
        moreThanOne: (value) => {
            if (value > 1) return true
            return false
        }
    },
    partialsDir: __dirname + '/views/partials'
}));
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
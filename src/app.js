import express from 'express';
import config from './config/config.js';
import sessionsRouter from './routes/sessions.router.js'
import productsRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars';
import __dirname from './utils.js'
import MongoStore from "connect-mongo";
import session from "express-session";

const app = express();
const PORT = config.app.PORT || 8080;

app.use(express.json());
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: 'c0digolarg0',
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://coder:123@cluster0.lwstatk.mongodb.net/?retryWrites=true&w=majority",
        ttl: 3600
    }),
    resave: false,
    saveUninitialized: false
}))

// HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/', viewsRouter);

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
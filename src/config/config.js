export default {
    mongo: {
        URL: process.env.MONGO_URL,
    },
    app: {
        PORT: process.env.PORT,
        URL: process.env.URL,
    },
    mailer: {
        USER: process.env.MAILER_USER,
        PASS: process.env.MAILER_PASS
    }
}
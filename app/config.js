module.exports = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || `localhost:${process.env.PORT || 3000}`,
    ENV: process.env.NODE_ENV || 'production',
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'Pinbook',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/pinbook',
}

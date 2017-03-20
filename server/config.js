const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const DEV_PORT = process.env.DEV_PORT || 3001;

const Config = {
    PORT,
    HOST,
    DEV_PORT,
    DOMAIN: `http://${HOST}:${PORT}`,
    DEV_DOMAIN: `http://${HOST}:${DEV_PORT}`,
    ENV: process.env.NODE_ENV || 'production',
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'Pinbook',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/pinbook',
}

module.exports = Config;
export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
export const env = process.env.NODE_ENV || 'production';

export const auth = {
    jwt: {
        secret: process.env.JWT_SECRET || 'PINBOOK'
    },

    // https://developers.facebook.com/
    facebook: {
        id: process.env.FACEBOOK_APP_ID || '',
        secret: process.env.FACEBOOK_APP_SECRET || ''
    },

    // https://cloud.google.com/console/project
    google: {
        id: process.env.GOOGLE_CLIENT_ID || '',
        secret: process.env.GOOGLE_CLIENT_SECRET || ''
    }
};
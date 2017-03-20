import express from 'express';
import config from './config';
import middler from './modules/middlewares';
import userCtrl from './controllers/userCtrl';

const router = express.Router();
const ensureAuth = middler.ensureAuthenticated({ secret: config.TOKEN_SECRET});
const createToken = middler.createToken({expired: 14, secret: config.TOKEN_SECRET});

/*
 |--------------------------------------------------------------------------
 | #user api
 |--------------------------------------------------------------------------
 */
let userApi = userCtrl.api({ createToken: createToken });
router.get('/api/me', ensureAuth, userApi.me);
router.post('/api/signin', userApi.signin);
router.post('/api/signup', userApi.signup);

/*
 |--------------------------------------------------------------------------
 | react rendering
 |--------------------------------------------------------------------------
 */
router.get('*', (req, res) => {
    if (config.ENV === 'development') {
        return res.redirect(config.DEV_DOMAIN);
    }
    return res.render('index.html');
});

module.exports = router;
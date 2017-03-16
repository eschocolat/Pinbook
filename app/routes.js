import express from 'express';
import config from './config';
import middler from './modules/middlewares';
import userCtrl from './controllers/userCtrl';
import reactRender from './controllers/reactRender';

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
router.get('*', reactRender);

module.exports = router;
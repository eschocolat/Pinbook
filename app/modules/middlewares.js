import jwt from 'jsonwebtoken';
import moment from 'moment';

const ensureAuthenticated = (options) => {
    options = options || {
        secret: ''
    };
    return (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).send({
                message: 'Please make sure your request has an Authorization header'
            });
        }

        let token = req.headers.authorization.split(' ')[1];
        let payload = jwt.verify(token, options.secret);
        console.log(payload);

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'Token has expired' });
        }

        req.user = payload.sub;
        console.log(req.user);

        next();
    }
};

const createToken = (options) => {
    options = options || {
        expired : 14,
        secret  : ''
    };

    return (user) => {
        let payload = {
            sub: user._id,
            iat: moment().unix(),
            exp: moment().add(options.expired, 'days').unix()
        };

        return jwt.sign(payload, options.secret);
    }
}

module.exports = { ensureAuthenticated, createToken };
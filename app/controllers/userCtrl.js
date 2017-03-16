import User from '../models/user';
import { isExisty } from '../modules/helpers';

const api = (options) => {

    let createToken = options.createToken;

    return {
        me : (req, res) => {
            User.findById(req.user, (err, user) => {
                if (err || !user)
                    return res.status(401).send();
                console.log("user check", user.toJSON());
                res.send(user.toJSON());
            });
        },

        signup: (req, res) => {
            let _user = req.body;
            let _query = User.findOne();
            _query.or([{ email: _user.email }, { username : _user.username }]);

            _query.exec((err, o) => {
                if(err) {
                    return res.status(401).send(err);
                }

                if(o) {
                    return res.status(409).send({ message: 'Email or ID is already taken' });
                }

                let user = new User({
                    email    : _user.email,
                    username : _user.username,
                    password : _user.password
                });

                user.save((err) => {
                    if(err) {
                        return res.status(401).send(err);
                    }

                    res.send({
                        token: createToken(user)
                    });

                });
            });
        },

        signin: (req, res) => {
            let _user = req.body;
            let identifier = _user.id;

            console.log(_user);

            if (!isExisty(identifier))
                return res.status(401).send('There is no user');

            User.findByIdentifier(identifier, (err, user) => {
                if (err){
                    return res.status(401).send(err);
                }
                console.log(user);
                if (!user) {
                    return res.status(401).send({ message: 'There is no user' });
                }

                user.comparePassword(_user.password, function(err, isMatch) {
                    if (!isMatch) {
                        return res.status(401).send({ message: 'Wrong email and/or password' });
                    }
                    res.send({
                        token: createToken(user)
                    });
                });
            });
        },

    }
};

module.exports = { api };

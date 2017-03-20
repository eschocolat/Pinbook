import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from '../modules/validator';
const Schema = mongoose.Schema;
mongoose.Promise = Promise;

const UserSchema = new Schema({
    email: {
        type: String,
        validate: validator.isEmail,
        required: [true, 'User email required'],
        trim: true,
        lowercase: true,
        unique: true
    },
    username: {
        type: String,
        /*validate: null,*/
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        validate: validator.validPassword,
        required: [true, 'User password required'],
        trim: true
    },
    created : {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    },
});

/*
 |--------------------------------------------------------------------------
 | #pre
 |--------------------------------------------------------------------------
 */
UserSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password'))
        return next();

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | #statics
 |--------------------------------------------------------------------------
 */
UserSchema.statics = {
    findByIdentifier : function(identifier, cb) {
        let opts = {};
        if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
            opts.$or = [{_id: identifier}, { username: identifier }];
        } else if (identifier.indexOf('@') === -1) {
            opts.username = identifier;
        } else {
            opts.email = identifier;
        }
        this.findOne(opts, cb);
    }
};

/*
 |--------------------------------------------------------------------------
 | #methods
 |--------------------------------------------------------------------------
 */
UserSchema.methods = {
    comparePassword: function(password, done) {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            done(err, isMatch);
        });
    },
    toJSON: function() {
        return {
            id       : this._id,
            username : this.username,
            email    : this.email,
            created  : this.created
        }
    },
};

module.exports = mongoose.model('User', UserSchema);
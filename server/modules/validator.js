const regexEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const regexPassword = /^.{8,64}$/;

module.exports = {
    isEmail: {
        validator: (v) => {
            return regexEmail.test(v);
        },
        message: '{VALUE} is not a valid email!'
    },
    validPassword: {
        validator: (v) => {
            return regexPassword.test(v);
        },
        message: '{VALUE} is not a valid password!'
    }
};
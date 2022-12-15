const bcrypt = require('bcryptjs');
require("dotenv").config();

const encryptPassword = (password) => {
    const hash = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_ROUNDS));

    return hash
}

const comparePassword = (password, hash) => {

    const isValid = bcrypt.compareSync(password, hash)

    return isValid;
}


module.exports = {
    encryptPassword,
    comparePassword
}
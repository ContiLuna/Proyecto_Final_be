const bcrypt = require('bcryptjs');


// Para usar variables de entorno en nodejs, 
// se debe crear un archivo .env en la raiz del proyecto, y 
// en el archivo .env se deben definir las variables de entorno, por ejemplo:

require('dotenv').config(); // Para usar variables de entorno en nodejs

const encryptPassword =  (password) => {
    const hash =  bcrypt.hashSync(password, parseInt(process.env.BCRYPT_ROUNDS)); // 12
    return hash;
}

const comparePassword = (password, hash) => {

    const isValid = bcrypt.compareSync(password, hash)

    return isValid;
}


module.exports = {
    encryptPassword,
    comparePassword
}

